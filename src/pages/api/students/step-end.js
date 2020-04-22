import faunadb from 'faunadb'
import joi from '@hapi/joi'

const secret = process.env.DPOS_FAUNADB_SECRET_KEY
const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async (req, res) => {
  const schema = joi
    .object({
      email: joi.string().required(),
    })
    .required()

  const { error, value } = schema.validate(req.query)

  if (error) {
    return res.status(400).json(error)
  }

  try {
    const ref = await client.query(
      q.Select('ref', q.Get(q.Match(q.Index('student_by_email'), value.email)))
    )

    await client.query(
      q.Update(ref, {
        data: {
          isStepEnd: true,
        },
      })
    )

    res.status(202).end()
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}
