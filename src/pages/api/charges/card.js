import * as gn from 'gn-api-sdk-node'
import joi from '@hapi/joi'

export default async (req, res) => {
  const schema = joi
    .object({
      installments: joi.number().integer().min(1).max(12).required(),
      payment_token: joi
        .string()
        .pattern(new RegExp('^[a-fA-F0-9]{40}$'))
        .required(),
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
          cpf: joi
            .string()
            .min(11)
            .max(11)
            .pattern(new RegExp('^[0-9]+$'))
            .required(),
          email: joi
            .string()
            .pattern(
              new RegExp(
                '^[A-Za-z0-9_\\-]+(?:[.][A-Za-z0-9_\\-]+)*@[A-Za-z0-9_]+(?:[-.][A-Za-z0-9_]+)*\\.[A-Za-z0-9_]+$'
              )
            )
            .required(),
          phone_number: joi
            .string()
            .pattern(new RegExp('^[1-9]{2}9?[0-9]{8}$'))
            .required(),
          birth: joi
            .string()
            .pattern(
              new RegExp(
                '[12][0-9]{3}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$'
              )
            )
            .required(),
        })
        .required(),
      address: joi
        .object({
          state: joi
            .string()
            .pattern(
              new RegExp(
                '^(?:A[CLPM]|BA|CE|DF|ES|GO|M[ATSG]|P[RBAEI]|R[JNSOR]|S[CEP]|TO)$'
              )
            )
            .required(),
          city: joi.string().min(1).max(50).required(),
          zipcode: joi.string().pattern(new RegExp('^[0-9]{8}')).required(),
          neighborhood: joi.string().min(1).max(255).required(),
          number: joi.string().min(1).max(255).required(),
          street: joi.string().min(1).max(200).required(),
        })
        .required(),
    })
    .required()
    .label('charge')

  const { error, value } = schema.validate(req.body, { abortEarly: false })

  if (error) {
    return res.status(400).json(error)
  }

  const gnsdk = new gn(process.env.gnConfig)

  try {
    const payed = await gnsdk.oneStep(
      {},
      {
        items: [value.product],
        payment: {
          credit_card: {
            installments: value.installments,
            payment_token: value.payment_token,
            customer: value.student,
            billing_address: value.address,
          },
        },
      }
    )

    res.status(201).json(payed)
  } catch (err) {
    res.status(500).json(err)
  }
}
