import { currentStepIs, useSharedStep } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputPaymentMethod = () => {
  const [step, stepNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputPaymentMethod', step) && (
      <>
        <div>
          <h1>O que você prefere usar?</h1>
        </div>
        <div>
          <label htmlFor="creditCard">
            <input
              onChange={({ currentTarget }) => assignNewValue(currentTarget)}
              checked
              id="creditCard"
              type="radio"
              name="paymentMethod"
              value="creditCard"
            />
            Cartão de crédito
          </label>
          <label htmlFor="billet">
            <input
              onChange={({ currentTarget }) => assignNewValue(currentTarget)}
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
            onClick={() => stepNextStep({ currentStep: 'InputCourse' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => stepNextStep({ currentStep: 'InputPaymentValues' })}
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
