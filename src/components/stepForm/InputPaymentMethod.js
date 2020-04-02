import { useRef, useEffect } from 'react'

import { currentStepIs, useSharedStep } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputPaymentMethod = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputRef = useRef(null)

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    controlInputValue({ name: 'paymentMethod', value: 'creditCard' })

    if (inputRef.current) {
      inputRef.current.value = values[inputRef.current.name]
    }
  }, [])

  return (
    currentStepIs('InputPaymentMethod', step) && (
      <>
        <div>
          <h1>O que você prefere usar?</h1>
        </div>
        <div>
          <label htmlFor="creditCard">
            <input
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              defaultChecked={
                !values.paymentMethod || values.paymentMethod === 'creditCard'
              }
              id="creditCard"
              type="radio"
              name="paymentMethod"
              value="creditCard"
            />
            Cartão de crédito
          </label>
          <label htmlFor="billet">
            <input
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              defaultChecked={values.paymentMethod === 'billet'}
              id="billet"
              type="radio"
              name="paymentMethod"
              value="billet"
            />
            Boleto bancário
          </label>
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputCourse' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => setNextStep({ currentStep: 'InputPaymentValues' })}
          >
            Do meu jeito
          </button>
        </div>

        <style jsx>{`
          div:nth-child(2) {
            flex-direction: column;
          }
          div:nth-child(2) label input {
            margin-right: 10px;
            width: 30px;
            height: 30px;
          }
          label {
            display: flex;
            flex-wrap: nowrap;
            height: 60px;
            align-items: center;
            font-size: 2rem;
          }
        `}</style>
      </>
    )
  )
}

export default InputPaymentMethod
