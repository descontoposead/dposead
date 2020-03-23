import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupBirth = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupBirth', step) && (
      <>
        <h1>Agora, informacoes de nascimento</h1>
        <input type="text" name="name" />
        <button
          onClick={() => stepNextStep({ currentStep: 'InputGroupParent' })}
        >
          Continuar
        </button>
      </>
    )
  )
}

export default InputGroupBirth
