import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputCourse = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputCourse', step) && (
      <>
        <h1>Qual curso vc deseja?</h1>
        <input type="text" name="name" />
        <button
          onClick={() => stepNextStep({ currentStep: 'InputGroupPayment' })}
        >
          Este é meu nome
        </button>
      </>
    )
  )
}

export default InputCourse
