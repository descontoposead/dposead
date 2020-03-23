import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputProfession = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputProfession', step) && (
      <>
        <h1>Qual é sua profissao</h1>
        <input type="text" name="name" />
        <button onClick={() => stepNextStep({ currentStep: 'InputZip' })}>
          Este é meu nome
        </button>
      </>
    )
  )
}

export default InputProfession
