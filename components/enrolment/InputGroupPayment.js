import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupPayment = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupPayment', step) && (
      <>
        <h1>Pronto, agora so falta nos dizer como deseja pagar</h1>
        <input type="text" name="name" />
        <button onClick={() => stepNextStep({ currentStep: 'Resume' })}>
          Continuar
        </button>
      </>
    )
  )
}

export default InputGroupPayment
