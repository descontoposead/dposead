import faunadb from 'faunadb'

const secret = process.env.FAUNADB_SECRET_KEY
const q = faunadb.query
const client = new faunadb.Client({ secret })

console.log(secret)

export default async (req, res) => {
  try {
    const dbs = await client.query(
      q.Create(q.Collection('students'), {
        data: {
          name: 'Gustvo',
        },
      })
    )

    res.status(200).json(dbs.data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
