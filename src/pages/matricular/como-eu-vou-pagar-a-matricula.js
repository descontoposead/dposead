import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSessionStorage } from 'react-use'

import withStepLayout from '../../components/StepLayout'

const Step = () => {
  const [stepPage] = useState({
    prev: '/matricular/escolha-o-metodo-de-pagamento-da-matricula',
    next: '/matricular/comprovante-de-matricula',
  })
  const [chargeValueTax, setChargeValueTax] = useState(null)
  const [instalmentPlan] = useState({
    creditCard: {
      max: 12,
      min: 1,
    },
    billet: {
      max: 1,
      min: 1,
    },
  })

  const [values, setValues] = useSessionStorage('values', {})

  const mergeInputValue = (target) =>
    setValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(function onLoadPageSetInitialChargeValue() {
    mergeInputValue({
      name: 'chargeValueTax',
      value: {
        instalment: 1,
        value: 18000,
        currency: 180,
      },
    })
  }, [])

  useEffect(function onLoadPageResetValuesOfCharge() {
    const initialChargeTaxValue = {
      instalment: 1,
      value: 18000,
      currency: 180,
    }
    setChargeValueTax(initialChargeTaxValue)
    mergeInputValue({
      name: 'chargeValueTax',
      value: initialChargeTaxValue,
    })
  }, [])

  const incrementInstalment = (e) => {
    e.preventDefault()

    if (chargeValueTax.instalment < instalmentPlan[values.payMethodTax].max) {
      setChargeValueTax({
        instalment: ++chargeValueTax.instalment,
        value: chargeValueTax.value,
        currency: chargeValueTax.value / 100 / chargeValueTax.instalment,
      })
      mergeInputValue({ name: 'chargeValueTax', value: chargeValueTax })
    }
  }

  const decrementInstalment = (e) => {
    e.preventDefault()

    if (chargeValueTax.instalment > instalmentPlan[values.payMethodTax].min) {
      setChargeValueTax({
        instalment: --chargeValueTax.instalment,
        value: chargeValueTax.value,
        currency: chargeValueTax.value / 100 / chargeValueTax.instalment,
      })
      mergeInputValue({ name: 'chargeValueTax', value: chargeValueTax })
    }
  }

  return (
    <>
      <Head>
        <link rel="prefetch" href={stepPage.next}></link>
      </Head>
      <div>
        <h1>Como você deseja pagar a matricula?</h1>
      </div>
      <div>
        <section>
          <strong>
            A <mark>Matricula</mark> por
          </strong>
          {values.payMethodTax === 'creditCard' ? (
            <>
              <button onClick={(e) => incrementInstalment(e)}>&#10092;</button>
              <strong>
                {chargeValueTax?.instalment} x de{' '}
                <i>{chargeValueTax?.currency.toFixed(2)} reais</i>
              </strong>
              <button onClick={(e) => decrementInstalment(e)}>&#10093;</button>
            </>
          ) : (
            <>
              <strong>
                {chargeValueTax?.instalment} x de{' '}
                <i>{chargeValueTax?.currency.toFixed(2)} reais</i>
              </strong>
            </>
          )}
        </section>
      </div>
      <div>
        <button
          className="prev"
          onClick={() => window.location.assign(stepPage.prev)}
        >
          Voltar
        </button>
        <button
          className="next"
          onClick={() => {
            Array.from(
              document.querySelectorAll('button.next, button.prev')
            ).map((b) => b.setAttribute('disabled', 'disabled'))
            sessionStorage.setItem('values', JSON.stringify(values))
            window.location.assign(stepPage.next)
          }}
        >
          ok
        </button>
      </div>

      <style jsx>{`
          div:nth-child(2) {
            flex-direction: column;
          }
          section {
            width: auto;
            display: flex;
            flex-direction: column;
            font-size: 2rem;
            align-items: baseline;
            text-align: left;
            margin-bottom: 40px
          }
          section:last-child {
            margin-bottom: 0;
          }
          section button {
            transform: rotate(90deg);
            padding: 5px;
            font-size: 1.5rem;
            border: 0;
            background: #ffffff;
            color: #292929;
            font-weight: bold;
            cursor: pointer;
            border: 4px solid;
            margin-left: 6px;
          }
          section > strong:first-child {
            margin-bottom: 10px;
          }
          i {
            font-size 1.5rem
          }
          mark {
            padding: 0 10px
          }
          strong {
            font-size: 1.8rem;
          }
        `}</style>
    </>
  )
}

export default withStepLayout(Step, { progressValue: 96 })
