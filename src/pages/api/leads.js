import faunadb from 'faunadb'
import joi from '@hapi/joi'
import fetch from 'node-fetch'
import absoluteUrl from 'next-absolute-url'

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
    //save lead on egoi platform
    const fullName = value.name.split(' ')
    const haveLastName = fullName.length > 1
    fetch('https://api.egoiapp.com/lists/1/contacts', {
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
          cellphone: '55-' + value.whatsapp, //all brazil code by default
        },
      }),
    })
      .then((res) => res.json())
      .then(({ contact_id }) =>
        fetch('https://api.egoiapp.com/lists/1/contacts/actions/attach-tag', {
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
      )
      .catch(console.log)

    //save lead on dpos datasource
    const dbs = await client.query(
      q.Create(q.Collection('leads'), { data: value })
    )
    res.setHeader('AMP-Redirect-To', `${absoluteUrl(req).origin}/obrigado`)
    res.status(201).json(dbs.data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
