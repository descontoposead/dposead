import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputPaymentMethod = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputPaymentMethod', step) && (
      <>
        <div>
          <h1>O que você prefere usar?</h1>
        </div>
        <section>
          <strong>Boleto bancário</strong>
        </section>
        <section>
          <strong>Cartão de crédito</strong>
        </section>
        <div>
          <button
            onClick={() => stepNextStep({ currentStep: 'InputPaymentValues' })}
          >
            Do meu jeito
          </button>
        </div>

        <style jsx>{``}</style>
      </>
    )
  )
}

export default InputPaymentMethod
