import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputZip = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputZip', step) && (
      <>
        <h1>Qual é seu cep?</h1>
        <input type="text" name="name" />
        <button
          onClick={() => stepNextStep({ currentStep: 'InputGroupAddress' })}
        >
          Este é meu nome
        </button>
      </>
    )
  )
}

export default InputZip
