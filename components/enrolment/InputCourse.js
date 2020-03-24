import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputCourse = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputCourse', step) && (
      <>
        <div>
          <h1>Qual curso vc deseja?</h1>
        </div>
        <div>
          <input type="text" name="name" />
        </div>
        <div>
          <button
            onClick={() => stepNextStep({ currentStep: 'InputGroupPayment' })}
          >
            Este é meu nome
          </button>
        </div>
      </>
    )
  )
}

export default InputCourse
