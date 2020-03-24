import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputEmail = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputEmail', step) && (
      <>
        <div>
          <h1>Qual e-mail você usa?</h1>
        </div>
        <div>
          <input
            autoFocus
            type="text"
            placeholder="escreva seu email..."
            name="name"
          />
        </div>
        <div>
          <button
            onClick={() => stepNextStep({ currentStep: 'InputGroupPhone' })}
          >
            É meu melhor e-mail
          </button>
        </div>
      </>
    )
  )
}

export default InputEmail
