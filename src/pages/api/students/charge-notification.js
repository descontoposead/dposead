import faunadb from 'faunadb'
import * as gn from 'gn-api-sdk-node'

const secret = process.env.DPOS_FAUNADB_SECRET_KEY
const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async (req, res) => {
  const gnsdk = new gn({
    client_id: process.env.DPOS_GN_CLIENT_ID,
    client_secret: process.env.DPOS_GN_CLIENT_SECRET,
    sandbox: process.env.NODE_ENV === 'development',
  })

  try {
    const { data } = await gnsdk.getNotification({
      token: req.body.notification,
    })

    const { status, value, custom_id, created_at } = data.pop()

    const found = await client.query(
      q.Let(
        {
          student: q.Get(q.Match(q.Index('students_by_charge_id'), custom_id)),
        },
        {
          ref: q.Select('ref', q.Var('student')),
          enrollments: q.Select(['data', 'enrollments'], q.Var('student'), []),
        }
      )
    )

    if (!found.enrollments.length) {
      res.status(404).json({
        enrollments: [],
        message: 'not_have_matricules',
      })
    }

    const getEnrollmentsWithLastNotificationAndFlagWhenPaid = () =>
      found.enrollments.map((enrol) => {
        enrol.charges = enrol.charges.map((charge) =>
          charge.id === custom_id
            ? Object.assign(charge, {
                firstPaid: status.current === 'paid',
                lastNotification: { status, value, created_at },
              })
            : charge
        )
        return enrol
      })

    await client.query(
      q.Update(found.ref, {
        data: {
          enrollments: getEnrollmentsWithLastNotificationAndFlagWhenPaid(),
        },
      })
    )

    res.status(202).end()
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}
