import faunadb from 'faunadb'
import joi from '@hapi/joi'

const secret = process.env.DPOS_FAUNADB_SECRET_KEY
const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async (req, res) => {
  //amp pages send the param
  if (req.query.hasOwnProperty) {
    delete req.query.__amp_source_origin
  }

  const schema = joi
    .object({
      name: joi.string().required(),
      email: joi.string().required(),
      whatsapp: joi.string().required(),
    })
    .required()
    .label('lead')

  const { error, value } = schema.validate(req.query)

  if (error) {
    return res.status(400).json(error)
  }

  try {
    const dbs = await client.query(
      q.Create(q.Collection('leads'), { data: value })
    )
    res.status(201).json(dbs.data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
