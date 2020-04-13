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
          name: joi.string().required(),
          email: joi.string().required(),
          phone: joi.string().required(),
          whatsapp: joi.string().required(),
          personalDocument: joi.string().required(),
          personalRegistry: joi.string().required(),
          stateOfBirth: joi.string().required(),
          cityOfBirth: joi.string().required(),
          dateOfBirth: joi.string().required(),
          parentName: joi.string().required(),
          motherName: joi.string().required(),
          zipcode: joi.string().required(),
          graduation: joi.string().required(),
          dateOfGraduation: joi.string().required(),
          address: joi
            .object({
              state: joi.string().required(),
              city: joi.string().required(),
              zipcode: joi.string().required(),
              neighborhood: joi.string().required(),
              street: joi.string().required(),
              number: joi.string().required(),
            })
            .required(),
        })
        .required(),
      enrollment: joi
        .object({
          course: joi.string().required(),
          charges: joi
            .array()
            .items(
              joi
                .object({
                  name: joi.string().required(),
                  description: joi.string(),
                  payMethod: joi.string().required(),
                  installments: joi.number().integer().required(),
                  value: joi.number().required(),
                  currency: joi.number().required(),
                })
                .required()
            )
            .required(),
        })
        .required(),
    })
    .required()

  const { error, value } = schema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  try {
    const dbs = await client.query(
      q.Create(q.Collection('students'), {
        data: Object.assign(value.student, {
          enrollments: [value.enrollment],
        }),
      })
    )
    res.status(201).json(dbs.data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
