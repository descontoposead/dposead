import { useState, useEffect } from 'react'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputChargeValueTax = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const [chargeValueTax, setChargeValueTax] = useState({
    instalment: 1,
    value: 20000,
    currency: 200,
  })
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

  useEffect(() => {
    controlInputValue({ name: 'chargeValueTax', value: chargeValueTax })
  }, [])

  const incrementInstalment = (e) => {
    e.preventDefault()

    if (chargeValueTax.instalment < instalmentPlan[values.payMethodTax].max) {
      setChargeValueTax({
        instalment: ++chargeValueTax.instalment,
        value: chargeValueTax.value,
        currency: chargeValueTax.value / 100 / chargeValueTax.instalment,
      })
      controlInputValue({ name: 'chargeValueTax', value: chargeValueTax })
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
      controlInputValue({ name: 'chargeValueTax', value: chargeValueTax })
    }
  }

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputChargeValueTax', step) && (
      <>
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
                <button onClick={(e) => incrementInstalment(e)}>
                  &#10092;
                </button>
                <strong>
                  {chargeValueTax.instalment} x de{' '}
                  <i>{chargeValueTax.currency.toFixed(2)} reais</i>
                </strong>
                <button onClick={(e) => decrementInstalment(e)}>
                  &#10093;
                </button>
              </>
            ) : (
              <>
                <strong>
                  {chargeValueTax.instalment} x de{' '}
                  <i>{chargeValueTax.currency.toFixed(2)} reais</i>
                </strong>
              </>
            )}
          </section>
        </div>
        <div>
          <button
            className="prev"
            onClick={() =>
              setNextStep({
                currentStep: 'InputPayMethodTax',
                progressValue: step.progressValue - 7.69,
              })
            }
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() =>
              setNextStep({
                currentStep: 'Resume',
                values: {
                  address: {
                    state: 'MG',
                    city: 'Córrego Novo',
                    zipcode: '35345-000',
                    neighborhood: 'Centro',
                    street: '9292',
                    number: '83',
                  },
                  payMethodCourse: 'creditCard',
                  chargeValueCourse: {
                    instalment: 1,
                    value: 200000,
                    currency: 2000,
                  },
                  payMethodTax: 'billet',
                  chargeValueTax: {
                    instalment: 1,
                    value: 20000,
                    currency: 200,
                  },
                  email: 'gustavo@mail.com',
                  name: 'Gustavo Jonatan',
                  phone: '(33) 9838-3838',
                  whatsapp: '(33) 99393-9399',
                  personalDocument: '108.470.806-09',
                  personalRegistry: 'MG9393',
                  stateOfBirth: 'MG',
                  cityOfBirth: 'Corrego Novo',
                  dateOfBirth: '12/09/1995',
                  parentName: 'Jose Antionio',
                  motherName: 'Conceicao Alves',
                  zipcode: '35345-000',
                  graduation: 'Dev',
                  dateOfGraduation: '12/08/1995',
                  courseName: 'SUPERVISÃO E ADMINISTRAÇÃO ESCOLAR',
                },
                progressValue: step.progressValue + 7.69,
              })
            }
          >
            Assim está bom
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
  )
}

export default InputChargeValueTax
