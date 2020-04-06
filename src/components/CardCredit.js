import { useState, useRef, useEffect } from 'react'

import HipercardIcon from './icon/HipercardIcon'
import AmexIcon from './icon/AmexIcon'
import DinersIcon from './icon/DinersIcon'
import EloIcon from './icon/EloIcon'
import MastercardIcon from './icon/MastercardIcon'
import VisaIcon from './icon/VisaIcon'

const CardForm = () => {
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
  const [hasError, setError] = useState(false)

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
      isValid: false,
    },
    expiration_month: {
      isValid: false,
    },
    expiration_year: {
      isValid: false,
    },
    cvv: {
      isValid: false,
    },
    brand: {
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

  const controlCardValue = () => async ({ target }) => {
    setCardValues(
      Object.assign(cardValues, {
        [target.name]: target.value,
      })
    )

    if (target.name === 'cvv') {
      if (new RegExp(/^[0-9]{3,4}$/).test(target.value)) {
        setCardValidate(
          Object.assign(cardValidate, {
            cvv: {
              isValid: true,
            },
          })
        )
      } else {
        return
      }
    }

    if (target.name === 'expiration_month') {
      if (new RegExp(/^(0[1-9]|1[0-2])$/).test(target.value)) {
        setCardValidate(
          Object.assign(cardValidate, {
            expiration_month: {
              isValid: true,
            },
          })
        )
      }
    }

    if (target.name === 'expiration_year') {
      if (new RegExp(/^(2021|202[1-9]{1}|203[0-9]{1})$/).test(target.value)) {
        setCardValidate(
          Object.assign(cardValidate, {
            expiration_year: {
              isValid: true,
            },
          })
        )
      }
    }

    if (
      cardValidate.number.isValid &&
      cardValidate.brand.isValid &&
      cardValidate.expiration_month.isValid &&
      cardValidate.expiration_year.isValid &&
      !cardValidate.cvv.isValid
    ) {
      setTimeout(() => flipCard()({ preventDefault: () => null }), 200)
      return
    }

    try {
      const {
        data: { payment_token },
      } = await getPaymentTokenAsync(cardValues)
      setPaymentToken(payment_token)
      setTimeout(() => flipCard()({ preventDefault: () => null }), 200)
    } catch (e) {
      if (!e.hasOwnProperty('error_description')) {
        setError(true)
        return
      }

      const prop = e.error_description
        .match(/\[(\w+)\]/g, '')
        .pop()
        .replace(/\W/g, '')

      Array.from(['brand', 'number']).forEach((cardProp) =>
        setCardValidate(
          Object.assign(cardValidate, {
            [cardProp]: {
              isValid: true,
            },
          })
        )
      )

      setCardValidate(
        Object.assign(cardValidate, {
          [prop]: {
            isValid: false,
          },
        })
      )
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

  const isValidCardValues = () => {
    window.$gn.checkout.getPaymentToken(cardValues, console.log)
  }

  const pay = () => (event) => {
    event.preventDefault()
    console.log(isValidCardValues())
  }

  useEffect(() => {
    if (!isFlipped && cardValues.brand) {
      setSelectedBrandIcon(getBrandIconComponent(cardValues.brand))
    }
  }, [cardValues?.brand])

  return (
    <>
      <div className="wrapper">
        <div className="cart">
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
        {cardValues.cvv && <button onClick={flipCard()}>Alterar CVV</button>}
        <button
          className="btnPay"
          disabled={!paymentToken || hasError}
          onClick={pay()}
        >
          Pagar
        </button>
      </div>
      <style jsx>{`
        button.btnPay {
          border: solid 4px #10795c !important;
          color: #10795c !important;
          transition: 1s;
        }
        button:disabled.btnPay {
          border: solid 4px #ddd !important;
          color: #ddd !important;
        }
        @media (min-width: 400px) {
          section {
            width: 400px;
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
        div.cart {
          border-radius: 10px;
          border-left: 4px solid #ffe500;
          background: #fff59f;
          padding: 10px 20px;
          box-sizing: border-box;
          text-align: left;
          margin-bottom: 10px;
        }
        div.cart h3,
        div.cart h4 {
          line-height: 1;
          margin: 0;
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

export default CardForm
