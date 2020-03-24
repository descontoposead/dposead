import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputProfession = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputProfession', step) && (
      <>
        <div>
          <h1>O que você faz? (Profissão)</h1>
        </div>
        <div>
          <input type="text" name="name" placeholder="escreva aqui..." />
        </div>
        <div>
          <button onClick={() => stepNextStep({ currentStep: 'InputZip' })}>
            Este é meu nome
          </button>
        </div>
      </>
    )
  )
}

export default InputProfession
