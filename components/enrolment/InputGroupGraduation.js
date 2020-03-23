import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupGraduation = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupGraduation', step) && (
      <>
        <h1>Agora, graduacao</h1>
        <input type="text" name="name" />
        <button onClick={() => stepNextStep({ currentStep: 'InputCourse' })}>
          Continuar
        </button>
      </>
    )
  )
}

export default InputGroupGraduation
