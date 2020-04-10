import * as gn from 'gn-api-sdk-node'
import joi from '@hapi/joi'

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
  const schema = joi
    .object({
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
            .pattern(new RegExp('^[ ]*(.+[ ]+)+.+[ ]*$'))
            .required(),
          cpf: joi.string().pattern(new RegExp('^[0-9]+$')).required(),
          phone_number: joi
            .string()
            .pattern(new RegExp('^[1-9]{2}9?[0-9]{8}$'))
            .required(),
        })
        .required(),
    })
    .required()
    .label('charge')

  const { error, value } = schema.validate(req.body, { abortEarly: false })

  if (error) {
    return res.status(400).json(error)
  }

  const gnsdk = new gn({
    client_id: process.env.DPOS_GN_CLIENT_ID,
    client_secret: process.env.DPOS_GN_CLIENT_SECRET,
    sandbox: process.env.NODE_ENV === 'development',
  })

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
              'Em até 2 dias depois do boleto pago, o acesso ao Portal Do Aluno será enviado no e-mail cadastrado.',
          },
        },
      }
    )

    if (billet.code !== 200) {
      return res.status(charge.code).json(billet)
    }

    res.status(201).json({
      barcode: billet.data.barcode,
      archive: billet.data.pdf.charge,
    })
  } catch (err) {
    console.log(process.env.DPOS_GN_CLIENT_ID)
    res.status(500).json(err)
  }
}
