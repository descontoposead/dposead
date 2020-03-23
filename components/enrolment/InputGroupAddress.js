import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupAddress = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupAddress', step) && (
      <>
        <h1>Agora, informacoes de endereco</h1>
        <input type="text" name="name" />
        <button
          onClick={() => stepNextStep({ currentStep: 'InputGroupGraduation' })}
        >
          Continuar
        </button>
      </>
    )
  )
}

export default InputGroupAddress
