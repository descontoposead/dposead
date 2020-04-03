import * as gn from 'gn-api-sdk-node'
import joi from '@hapi/joi'

const options = {
  client_id: process.env.gn.clientId,
  client_secret: process.env.gn.clientSecret,
  sandbox: true,
}

const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

const addDays = (date, days) => {
  const future = new Date(date)
  future.setDate(future.getDate() + days || 0)
  return formatDate(future)
}

export default async (req, res) => {
  const schema = joi.object({
    product: joi
      .object({
        name: joi
          .string()
          .min(1)
          .max(255)
          .pattern(new RegExp('^[^<>]+$'))
          .required(),
        value: joi.number().integer().required(),
      })
      .required(),
    student: joi
      .object({
        name: joi
          .string()
          .min(1)
          .max(255)
          .pattern(new RegExp('^[a-zA-Z ]+$'))
          .required(),
        cpf: joi.string().pattern(new RegExp('^[0-9]+$')).required(),
        phone_number: joi.string().pattern(new RegExp('^[0-9]+$')).required(),
      })
      .required(),
  })

  const { error, value } = schema.validate(
    {
      product: {
        name: 'Taxa de inscrição para o curso - Pedagogia, 500h',
        value: 20000,
      },
      student: {
        name: 'Gustavo Jonathan Oliveira e Lima',
        cpf: '10847080609',
        phone_number: '5144916523',
      },
    },
    { abortEarly: false }
  )

  if (error) {
    return res.status(400).json(error)
  }

  const gnsdk = new gn(options)

  try {
    const charge = await gnsdk.createCharge({}, { items: [value.product] })

    if (charge.code !== 200) {
      return res.status(charge.code).json(charge)
    }

    const billet = await gnsdk.payCharge(
      { id: charge.data.charge_id },
      {
        payment: {
          banking_billet: {
            expire_at: addDays(new Date(), 1),
            customer: value.student,
            message:
              'Em até 2 dias depois do boleto pago, seu acesso ao portal do aluno será liberado.',
          },
        },
      }
    )

    if (billet.code !== 200) {
      return res.status(charge.code).json(billet)
    }

    res.status(200).json({
      type: 'billet',
      barcode: billet.data.barcode,
      archive: billet.data.pdf.charge,
    })
  } catch (err) {
    res.status(500).json(err)
  }
}
