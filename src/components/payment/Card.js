import { useState, useRef, useEffect } from 'react'

import HipercardIcon from '../icon/HipercardIcon'
import AmexIcon from '../icon/AmexIcon'
import DinersIcon from '../icon/DinersIcon'
import EloIcon from '../icon/EloIcon'
import MastercardIcon from '../icon/MastercardIcon'
import VisaIcon from '../icon/VisaIcon'

const Card = (props) => {
  const [brandIconComponents] = useState({
    AmexIcon,
    DinersIcon,
    EloIcon,
    HipercardIcon,
    MastercardIcon,
    VisaIcon,
  })
  const [SelectedBrandIcon, setSelectedBrandIcon] = useState(null)
  const [isFlipped, setToggleFlipped] = useState(false)
  const [isEndTransition, setEndTransition] = useState(true)
  const [cardValues, setCardValues] = useState({})
  const [paymentToken, setPaymentToken] = useState(null)
  const [hasTokenError, setTokenError] = useState(false)
  const [hasFetchError, setFetchError] = useState(false)
  const [paymentResponse, setPaymentResponse] = useState(null)

  const inputCardNumberRef = useRef(null)
  const inputCardExpMonthref = useRef(null)
  const inputCardExpYearRef = useRef(null)
  const inputCardCvvRef = useRef(null)

  const getPaymentTokenAsync = (cardValues) =>
    new Promise((resolve, reject) => {
      window.$gn.checkout.getPaymentToken(cardValues, (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })

  const [cardValidate, setCardValidate] = useState({
    number: {
      validate: () =>
        Object.keys(brandRegexTypes).filter((brand) =>
          new RegExp(brandRegexTypes[brand]).test(
            inputCardNumberRef.current.value
          )
        ).length > 0,
      isValid: false,
    },
    expiration_month: {
      validate: () =>
        new RegExp(/^(0[1-9]|1[0-2])$/).test(
          inputCardExpMonthref.current.value
        ),
      isValid: false,
    },
    expiration_year: {
      validate: () =>
        new RegExp(/^(2021|202[1-9]{1}|203[0-9]{1})$/).test(
          inputCardExpYearRef.current.value
        ),
      isValid: false,
    },
    cvv: {
      validate: () =>
        new RegExp(/^[0-9]{3,4}$/).test(inputCardCvvRef.current.value),
      isValid: false,
    },
    brand: {
      validate: () => true,
      isValid: false,
    },
  })

  const brandRegexTypes = {
    EloIcon: /^(40117[8-9]|431274|438935|451416|457393|45763[1-2]|506(699|7[0-6][0-9]|77[0-8])|509\d{3}|504175|627780|636297|636368|65003[1-3]|6500(3[5-9]|4[0-9]|5[0-1])|6504(0[5-9]|[1-3][0-9])|650(4[8-9][0-9]|5[0-2][0-9]|53[0-8])|6505(4[1-9]|[5-8][0-9]|9[0-8])|6507(0[0-9]|1[0-8])|65072[0-7]|6509(0[1-9]|1[0-9]|20)|6516(5[2-9]|[6-7][0-9])|6550([0-1][0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
    VisaIcon: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MastercardIcon: /^5[1-5][0-9]{14}$/,
    AmexIcon: /^3[47][0-9]{13}$/,
    DinersIcon: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  }

  const getBrandIconComponent = (brandPropName) =>
    brandPropName.match(/icon/i)
      ? brandIconComponents[brandPropName]
      : brandIconComponents[
          brandPropName.charAt(0).toUpperCase() +
            brandPropName.slice(1) +
            'Icon'
        ]

  const getBrandByCardNumber = () => ({ target }) => {
    target.value = target.value.replace(/\D/g, '')

    setSelectedBrandIcon(null)
    controlCardValue()({
      target: {
        name: 'brand',
        value: '',
      },
    })

    Object.keys(brandRegexTypes).forEach((brand) => {
      if (new RegExp(brandRegexTypes[brand]).test(target.value)) {
        setSelectedBrandIcon(getBrandIconComponent(brand))
        controlCardValue()({
          target: {
            name: 'brand',
            value: brand.replace(/icon/gi, '').toLowerCase(),
          },
        })
      }
    })
  }

  const jusMissingCvv = () => {
    return (
      cardValidate.number.isValid &&
      cardValidate.expiration_month.isValid &&
      cardValidate.expiration_year.isValid &&
      !cardValidate.cvv.isValid &&
      !cardValues.cvv
    )
  }

  const cardValuesCompleted = () => {
    return (
      cardValidate.number.isValid &&
      cardValidate.expiration_month.isValid &&
      cardValidate.expiration_year.isValid &&
      cardValidate.cvv.isValid
    )
  }

  const controlCardValue = () => async ({ target }) => {
    setCardValues(
      Object.assign(cardValues, {
        [target.name]: target.value,
      })
    )

    setCardValidate(
      Object.assign(cardValidate, {
        [target.name]: Object.assign(cardValidate[target.name], {
          isValid: cardValidate[target.name].validate(),
        }),
      })
    )

    if (cardValuesCompleted() && isFlipped) {
      try {
        const {
          data: { payment_token },
        } = await getPaymentTokenAsync(cardValues)
        setPaymentToken(payment_token)
        setTokenError(false)
        setTimeout(() => flipCard()({ preventDefault: () => null }), 2000)
      } catch (e) {
        setTokenError(true)

        if (!e.hasOwnProperty('error_description')) {
          return
        }

        const prop = e.error_description
          .match(/\[(\w+)\]/g, '')
          .pop()
          .replace(/\W/g, '')

        setCardValidate(
          Object.assign(cardValidate, {
            [prop]: Object.assign(cardValidate[prop], {
              isValid: cardValidate[prop].validate(),
            }),
          })
        )
      }
    }

    if (jusMissingCvv()) {
      setTimeout(() => flipCard()({ preventDefault: () => null }), 200)
    }
  }

  const flipCard = (reset = false) => (event) => {
    event.preventDefault()

    if (reset) {
      setToggleFlipped(false)
    } else {
      setToggleFlipped(!isFlipped)
    }

    setEndTransition(false)

    setTimeout(() => setEndTransition(true), 700)
  }

  const pay = () => (event) => {
    event.preventDefault()

    fetch('/api/charges/card', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        installments: props.values.courseTaxValue.instalment,
        payment_token: paymentToken,
        product: {
          name: props.values.courseName,
          value: props.values.courseTaxValue.value,
        },
        student: {
          name: props.values.name,
          cpf: props.values.personalDocument.replace(/\D/g, ''),
          email: props.values.email,
          phone_number: props.values.whatsapp.replace(/\D/g, ''),
          birth: new Date(props.values.dateOfBirth)
            .toISOString()
            .replace(/=?T.*/, ''),
        },
        address: {
          state: props.values.address.state,
          city: props.values.address.city,
          zipcode: props.values.address.zipcode.replace(/\D/g, ''),
          neighborhood: props.values.address.neighborhood,
          number: props.values.address.number,
          street: props.values.address.street,
        },
      }),
    })
      .then(async (res) => {
        if (res.status !== 201) throw await res.json()
        return await res.json()
      })
      .then((res) => {
        setPaymentResponse(res)
        setFetchError(false)
      })
      .catch(setFetchError)
  }

  useEffect(() => {
    if (!isFlipped && cardValues.brand) {
      setSelectedBrandIcon(getBrandIconComponent(cardValues.brand))
    }
  }, [cardValues?.brand])

  const canViewCard = () => !hasFetchError && !paymentResponse
  const canViewCardError = () => hasFetchError && !paymentResponse
  const canViewCardSuccess = () => Boolean(paymentResponse)

  return (
    <>
      {canViewCard() && (
        <>
          <div className="wrapper">
            <div className="alert alert-warning">
              <h3>Matricula</h3>
              <h4>Gestão de negocios - 1 X de 200.00</h4>
            </div>
            <section
              style={{ padding: isFlipped ? 10 : 10 }}
              className={isFlipped ? 'flipped' : 'unflipped'}
            >
              {!isFlipped && isEndTransition ? (
                <>
                  <div>
                    <h1>Gustavo J O Lima</h1>
                    <h2>Graduado em Ciências da computação</h2>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="card-number">Número do cartão</label>
                      <input
                        ref={inputCardNumberRef}
                        name="number"
                        id="card-number"
                        type="text"
                        autoFocus
                        autoComplete="off"
                        onChange={(event) => {
                          controlCardValue()(event)
                          getBrandByCardNumber()(event)
                        }}
                        defaultValue={cardValues?.number}
                        placeholder="xxxx xxxx xxxxx xxxxx"
                      />
                    </div>
                    <div>
                      <div>
                        <span>Valido até</span>
                        <div>
                          <div>
                            <input
                              ref={inputCardExpMonthref}
                              name="expiration_month"
                              type="text"
                              autoComplete="off"
                              placeholder="xx"
                              defaultValue={cardValues?.expiration_month}
                              onChange={controlCardValue()}
                            />
                          </div>
                          <div>
                            <input
                              ref={inputCardExpYearRef}
                              name="expiration_year"
                              type="text"
                              autoComplete="off"
                              placeholder="xxxx"
                              defaultValue={cardValues?.expiration_year}
                              onChange={controlCardValue()}
                            />
                          </div>
                        </div>
                      </div>
                      {SelectedBrandIcon && SelectedBrandIcon}
                    </div>
                  </div>
                </>
              ) : (
                isEndTransition && (
                  <>
                    <div></div>
                    <div>
                      <input
                        ref={inputCardCvvRef}
                        type="text"
                        name="cvv"
                        autoComplete="off"
                        autoFocus
                        placeholder="cvv"
                        defaultValue={cardValues?.cvv}
                        onChange={controlCardValue()}
                      />
                    </div>
                  </>
                )
              )}
            </section>
            <article>
              <ul>
                <li>
                  <AmexIcon />
                </li>
                <li>
                  <DinersIcon />
                </li>
                <li>
                  <EloIcon />
                </li>
              </ul>
              <ul>
                <li>
                  <HipercardIcon />
                </li>
                <li>
                  <MastercardIcon />
                </li>
                <li>
                  <VisaIcon />
                </li>
              </ul>
            </article>
          </div>
          <div className="actions">
            {cardValues.cvv && (
              <button onClick={flipCard()}>Alterar CVV</button>
            )}
            <button
              className={
                hasTokenError || hasFetchError ? 'btnPay btnError' : 'btnPay'
              }
              onClick={pay()}
            >
              {hasTokenError ? '!!! Cartão inválido' : 'Pagar'}
            </button>
          </div>
        </>
      )}
      {canViewCardError() && (
        <>
          <div className="alert alert-danger">
            <h3>Pagamento não autorizado!</h3>
            <h4>Tente usar outro cartão de crédito!</h4>
          </div>
          <div className="actions">
            <button
              onClick={() => {
                setFetchError(false)
              }}
            >
              Tentar novamente
            </button>
          </div>
        </>
      )}
      {canViewCardSuccess() && (
        <>
          <div className="alert alert-success">
            <h3>Pagamento autorizado com sucesso</h3>
            <h4>
              Aguarde até liberarmos o acesso ao seu portal. Fique atento a sua
              caixa de emails!
            </h4>
          </div>

          <div className="actions">
            <button onClick={() => window.location.replace('/')}>
              Voltar ao site
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        button.btnPay {
          border: solid 4px #10795c !important;
          color: #10795c !important;
          transition: 1s;
        }
        button.btnError {
          border: solid 4px #d9222a !important;
          color: #d9222a !important;
        }
        @media (min-width: 400px) {
          section {
            width: 350px;
          }
        }
        @media (max-width: 350px) {
          div.wrapper {
            overflow-y: auto;
            height: 62vh;
          }
          section {
            width: 278px;
          }
          div.actions {
            flex: 1;
            display: flex;
            justify-content: flex-start;
          }
        }
        div.alert {
          border-radius: 10px;
          border-left: 4px solid;

          padding: 10px 20px;
          box-sizing: border-box;
          text-align: left;
          margin-bottom: 10px;
        }
        div.alert h3,
        div.alert h4 {
          line-height: 1;
          margin: 0;
        }
        div.alert-warning {
          border-color: #ffe500;
          background: #fff59f;
        }
        div.alert-danger {
          border-color: #d9222a;
          background: #ffc5c7;
        }
        div.alert-success {
          border-color: #10795c;
          background: #d2eee6;
        }
        article {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          margin-bottom: 20px;
        }
        article h4 {
          margin: 10px 0;
        }
        article ul {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
          justify-content: center;
        }
        article ul li {
          margin: 0;
          height: 40px;
        }
        section.flipped {
          transform: rotateY(3rad);
          justify-content: flex-end;
        }
        section.flipped > * {
          transform: rotateY(3rad);
        }
        section.flipped > div:nth-child(1) {
          width: 100%;
          height: 40px;
          margin-top: 30px;
          background: #000;
        }
        section.flipped > div:nth-child(2) {
          width: 70%;
          height: 35px;
          background: #ee9f2d;
        }
        section.flipped > div:nth-child(2) input {
          float: right;
          width: 56px;
          height: 100%;
          margin: 0;
        }
        section {
          transform: rotateY(0rad);
          transition: 0.7s;
          height: 190px;
          background: #639486;
          text-align: left;
          display: flex;
          flex-wrap: wrap;
          border-radius: 15px;
          margin-bottom: 15px;
          color: #fff;
          box-shadow: 0px 4px 7px 0px #181818;
          background-color: #222222;
        }
        section.unflipped {
          align-content: space-between;
        }
        section > div:nth-child(1) {
        }
        section > div:nth-child(2) {
          width: 100%;
        }
        section > div:nth-child(2) > div:last-child {
          display: flex;
          align-items: flex-end;
        }
        section > div:nth-child(2) > div:last-child > div:first-child {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          flex: 2;
          margin-top: 10px;
        }
        section > div:nth-child(2) > div:last-child > img {
          flex: 1;
        }
        section > div:nth-child(2) > div:last-child > div:first-child > div {
          display: flex;
        }
        section
          > div:nth-child(2)
          > div:last-child
          > div:first-child
          > div
          > div:nth-child(1) {
          flex: 1;
          margin-right: 10px;
        }
        section
          > div:nth-child(2)
          > div:last-child
          > div:first-child
          > div
          > div:nth-child(2) {
          flex: 2;
        }
        section > div:nth-child(2) input {
          width: 100%;
          text-align: left;
          padding: 5px 10px;
          font-size: 1.2rem;
          box-sizing: border-box;
        }
        section
          > div:nth-child(2)
          > div:last-child
          > div:first-child
          input:nth-child(1) {
          width: 100%;
        }
        section
          > div:nth-child(2)
          > div:last-child
          > div:first-child
          input:nth-child(2) {
          width: 100%;
        }
        section > div:nth-child(1) h1 {
          font-size: 1rem;
          margin: 0;
          color: #fff;
        }
        section > div:nth-child(1) h2 {
          font-size: 0.9rem;
          margin: 0;
          line-height: 1;
        }
        button:nth-of-type(1) {
          margin-right: 10px;
        }
      `}</style>
    </>
  )
}

export default Card
