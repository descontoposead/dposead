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
          name: joi.string().required(), //required for first step
          email: joi.string().required(), //required for first step
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
        .required(),
      enrollment: joi.object({
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
            })
            .required()
        ),
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
        q.Paginate(q.Match(q.Index('student_by_email'), value.student.email)),
        q.Lambda('student', q.Get(q.Var('student')))
      )
    )

    found.data.length
      ? (async function updateAndReturnData() {
          const { ref, data } = found.data.pop()
          const student = Object.assign(data, value.student)

          const updated = await client.query(
            q.Update(ref, {
              data: student,
            })
          )

          res.status(200).json(updated.data)
        })()
      : (async function insertAndReturnCreated() {
          const inserted = await client.query(
            q.Create(q.Collection('students'), {
              data: value.student,
            })
          )

          res.status(201).json(inserted.data)
        })()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
