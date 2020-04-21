import faunadb from 'faunadb'
import joi from '@hapi/joi'

const secret = process.env.DPOS_FAUNADB_SECRET_KEY
const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async (req, res) => {
  const schema = joi
    .object({
      email: joi.string().required(),
      name: joi.string(),
      phone: joi.string(),
      whatsapp: joi.string(),
      personalDocument: joi.string(),
      personalRegistry: joi.string(),
      stateOfBirth: joi.string(),
      cityOfBirth: joi.string(),
      dateOfBirth: joi.string(),
      parentName: joi.string(),
      motherName: joi.string(),
      zipcode: joi.string(),
      graduation: joi.string(),
      dateOfGraduation: joi.string(),
      address: joi.object({
        state: joi.string(),
        city: joi.string(),
        zipcode: joi.string(),
        neighborhood: joi.string(),
        street: joi.string(),
        number: joi.string(),
      }),
    })
    .required()

  const { error, value } = schema.validate(req.body)

  if (error) {
    return res.status(400).json(error)
  }

  try {
    const found = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('student_by_email'), value.email)),
        q.Lambda('student', q.Get(q.Var('student')))
      )
    )

    found.data.length
      ? (async function updateAndReturnData() {
          const { ref, data } = found.data.pop()

          const updated = await client.query(
            q.Update(ref, {
              data: Object.assign(data, value),
            })
          )

          res.status(200).json(updated.data)
        })()
      : (async function insertAndReturnCreated() {
          const inserted = await client.query(
            q.Create(q.Collection('students'), {
              data: value,
            })
          )

          res.status(201).json(inserted.data)
        })()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
