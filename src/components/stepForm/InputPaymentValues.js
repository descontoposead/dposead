import { useState, useEffect } from 'react'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputPaymentValues = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const [inputCourse, setInputCourse] = useState({
    instalment: 1,
    value: 200000,
    currency: 2000,
  })
  const [inputTax, setInputTax] = useState({
    instalment: 1,
    value: 20000,
    currency: 200,
  })
  const [instalmentsControl] = useState({
    courseValue: {
      maxInstalment: 18,
      minInstalment: 1,
      state: inputCourse,
      stateControl: setInputCourse,
    },
    courseTaxValue: {
      maxInstalment: 3,
      minInstalment: 1,
      state: inputTax,
      stateControl: setInputTax,
    },
  })

  useEffect(() => {
    controlInputValue({ name: 'courseValue', value: inputCourse })
    controlInputValue({ name: 'courseTaxValue', value: inputTax })
  }, [])

  const incrementInstalment = (e, control) => {
    e.preventDefault()

    const instalmentControl = instalmentsControl[control]

    if (instalmentControl.state.instalment < instalmentControl.maxInstalment) {
      instalmentControl.stateControl({
        instalment: ++instalmentControl.state.instalment,
        value: instalmentControl.state.value,
        currency:
          instalmentControl.state.value /
          100 /
          instalmentControl.state.instalment,
      })
      controlInputValue({ name: control, value: instalmentControl.state })
    }
  }

  const decrementInstalment = (e, control) => {
    e.preventDefault()

    const instalmentControl = instalmentsControl[control]

    if (instalmentControl.state.instalment > instalmentControl.minInstalment) {
      instalmentControl.stateControl({
        instalment: --instalmentControl.state.instalment,
        value: instalmentControl.state.value,
        currency:
          instalmentControl.state.value /
          100 /
          instalmentControl.state.instalment,
      })
      controlInputValue({ name: control, value: instalmentControl.state })
    }
  }

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputPaymentValues', step) && (
      <>
        <div>
          <h1>Adeque ao seu bolso</h1>
        </div>
        <div>
          <section>
            <strong>
              O <mark>Curso</mark> por
            </strong>
            <button onClick={(e) => incrementInstalment(e, 'courseValue')}>
              &#10092;
            </button>
            <strong>
              {inputCourse.instalment} x de{' '}
              <i>{inputCourse.currency.toFixed(2)} reais</i>
            </strong>
            <button onClick={(e) => decrementInstalment(e, 'courseValue')}>
              &#10093;
            </button>
          </section>
          <section>
            <strong>
              A <mark>Matricula</mark> por
            </strong>
            {values.paymentMethod === 'creditCard' ? (
              <>
                <button
                  onClick={(e) => incrementInstalment(e, 'courseTaxValue')}
                >
                  &#10092;
                </button>
                <strong>
                  {inputTax.instalment} x de{' '}
                  <i>{inputTax.currency.toFixed(2)} reais</i>
                </strong>
                <button
                  onClick={(e) => decrementInstalment(e, 'courseTaxValue')}
                >
                  &#10093;
                </button>
              </>
            ) : (
              <>
                <strong>
                  {inputTax.instalment} x de{' '}
                  <i>{inputTax.currency.toFixed(2)} reais</i>
                </strong>
              </>
            )}
          </section>
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputPaymentMethod' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() =>
              setNextStep({ currentStep: 'Resume', values: values })
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
            width: 215px;
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

export default InputPaymentValues
