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
            q.Match(q.Index('voucher_by_raw'), value.q.toLowerCase()),
            q.Match(q.Index('voucher_by_pretty'), value.q.toLowerCase())
          )
        ),
        q.Lambda('vouchers', q.Get(q.Var('vouchers')))
      )
    )

    const item = data
      .map((data) => data.data)
      .filter((voucher) => voucher.isActive)
      .pop()

    if (item) {
      res.status(200).json(item)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
