import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputName = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputName', step) && (
      <>
        <div>
          <h1>Qual é seu nome completo?</h1>
        </div>
        <div>
          <textarea
            autoFocus
            placeholder="escreva seu nome..."
            type="text"
            name="name"
          ></textarea>
        </div>
        <div>
          <button onClick={() => stepNextStep({ currentStep: 'InputEmail' })}>
            Este é meu nome
          </button>
        </div>
      </>
    )
  )
}

export default InputName
