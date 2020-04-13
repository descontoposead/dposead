import faunadb from 'faunadb'
import joi from '@hapi/joi'
import fetch from 'node-fetch'
import absoluteUrl from 'next-absolute-url'

const q = faunadb.query
const secret = process.env.DPOS_FAUNADB_SECRET_KEY
const client = new faunadb.Client({ secret })

export default async (req, res) => {
  const schema = joi
    .object({
      name: joi.string().required(),
      email: joi.string().required(),
      whatsapp: joi.string().required(),
      __amp_source_origin: joi.string(),
    })
    .required()
    .label('lead')

  const { error, value } = schema.validate(req.query)

  if (error) {
    return res.status(400).json(error)
  }

  //save lead on egoi platform
  try {
    const fullName = value.name.split(' ')
    const haveLastName = fullName.length > 1

    const res = await fetch('https://api.egoiapp.com/lists/1/contacts', {
      headers: {
        'Content-Type': 'application/json',
        Apikey: process.env.DPOS_EGOI_API_KEY,
      },
      method: 'post',
      body: JSON.stringify({
        base: {
          email: value.email,
          first_name: fullName[0],
          last_name: haveLastName ? fullName.pop() : '',
          cellphone: '55-' + value.whatsapp, //brazil code by default
        },
      }),
    })

    const { contact_id } = await res.json()

    await fetch('https://api.egoiapp.com/lists/1/contacts/actions/attach-tag', {
      headers: {
        'Content-Type': 'application/json',
        Apikey: process.env.DPOS_EGOI_API_KEY,
      },
      method: 'post',
      body: JSON.stringify({
        tag_id: 1,
        contacts: [contact_id],
      }),
    })
  } catch (err) {
    console.error(err)
  }

  //save lead on dpos datasource
  try {
    await client.query(q.Create(q.Collection('leads'), { data: value }))
    res.setHeader('AMP-Redirect-To', `${absoluteUrl(req).origin}/obrigado`)
  } catch (err) {
    console.error(err)
  }

  res.status(200).end()
}
