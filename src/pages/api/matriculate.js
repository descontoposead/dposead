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
                name: joi.string().required(),
                description: joi.string(),
                payMethod: joi.string().required(),
                installments: joi.number().integer().required(),
                value: joi.number().required(),
                currency: joi.number().required(),
                voucher: joi.string().allow(''),
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
          enrollments: [value.product, ...found.enrollments],
        },
      })
    )

    res.status(202).end()
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}
