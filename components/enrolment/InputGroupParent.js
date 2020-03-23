import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupParent = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupParent', step) && (
      <>
        <h1>Agora, informacoes dos pais</h1>
        <input type="text" name="name" />
        <button
          onClick={() => stepNextStep({ currentStep: 'InputCivilStatus' })}
        >
          Continuar
        </button>
      </>
    )
  )
}

export default InputGroupParent
