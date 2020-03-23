import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputCivilStatus = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputCivilStatus', step) && (
      <>
        <h1>Informação civil</h1>
        <input type="text" name="name" />
        <button
          onClick={() => stepNextStep({ currentStep: 'InputProfession' })}
        >
          Este é meu nome
        </button>
      </>
    )
  )
}

export default InputCivilStatus
