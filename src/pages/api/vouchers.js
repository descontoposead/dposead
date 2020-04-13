import faunadb from 'faunadb'
import joi from '@hapi/joi'

const q = faunadb.query
const secret = process.env.DPOS_FAUNADB_SECRET_KEY
const client = new faunadb.Client({ secret })

export default async (req, res) => {
  const schema = joi
    .object({
      q: joi.string().required().label('query'),
    })
    .required()

  const { error, value } = schema.validate(req.query)

  if (error) {
    return res.status(400).json(error)
  }

  try {
    const { data } = await client.query(
      q.Map(
        q.Paginate(
          q.Union(
            q.Match(q.Index('voucher_by_raw'), 'ListaVip400'),
            q.Match(q.Index('voucher_by_pretty'), 'ListaVip400')
          )
        ),
        q.Lambda('vouchers', q.Get(q.Var('vouchers')))
      )
    )

    res.status(200).json(data.map((data) => data.data))
  } catch (err) {
    console.error(err)
  }

  res.status(200).end()
}
