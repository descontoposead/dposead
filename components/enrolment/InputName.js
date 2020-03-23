import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputName = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputName', step) && (
      <>
        <h1>Qual é seu nome completo?</h1>
        <input type="text" name="name" />
        <button onClick={() => stepNextStep({ currentStep: 'InputEmail' })}>
          Este é meu nome
        </button>
      </>
    )
  )
}

export default InputName
