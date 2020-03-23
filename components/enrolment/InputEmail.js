import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputEmail = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputEmail', step) && (
      <>
        <h1>Agora, seu endereço de e-mail principal</h1>
        <input type="text" name="name" />
        <button
          onClick={() => stepNextStep({ currentStep: 'InputGroupPhone' })}
        >
          Continuar
        </button>
      </>
    )
  )
}

export default InputEmail
