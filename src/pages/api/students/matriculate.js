import faunadb from 'faunadb'
import joi from '@hapi/joi'

const secret = process.env.DPOS_FAUNADB_SECRET_KEY
const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async (req, res) => {
  const schema = joi
    .object({
      student: joi
        .object({
          email: joi.string().required(),
        })
        .required(),
      product: joi
        .object({
          course: joi.string(),
          charges: joi.array().items(
            joi
              .object({
                id: joi.string(),
                name: joi.string().required(),
                description: joi.string(),
                payMethod: joi.string().required(),
                dueDay: joi.string(),
                startIn: joi.string(),
                installments: joi.number().integer().required(),
                value: joi.number().required(),
                currency: joi.number().required(),
                voucher: joi.string().allow(''),
              })
              .when('name', {
                is: 'courseTax',
                then: joi.object({
                  id: joi.required(),
                }),
              })
              .when('payMethod', {
                is: 'billet',
                then: joi.object({
                  dueDay: joi.required(),
                  startIn: joi.required(),
                }),
              })
              .required()
          ),
        })
        .required(),
    })
    .required()

  const { error, value } = schema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  const getProductChargesWithFirstTaxChargeNotPayed = () =>
    value.product.charges.map((charge) =>
      charge.name === 'courseTax'
        ? Object.assign(charge, { firstPaid: false })
        : charge
    )

  try {
    const found = await client.query(
      q.Let(
        {
          student: q.Get(
            q.Match(q.Index('student_by_email'), value.student.email)
          ),
        },
        {
          ref: q.Select('ref', q.Var('student')),
          enrollments: q.Select(['data', 'enrollments'], q.Var('student'), []),
        }
      )
    )

    await client.query(
      q.Update(found.ref, {
        data: {
          isStepEnd: true,
          enrollments: [
            Object.assign(value.product, {
              charges: getProductChargesWithFirstTaxChargeNotPayed(),
            }),
            ...found.enrollments,
          ],
        },
      })
    )

    res.status(202).end()
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}
