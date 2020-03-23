import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupPhone = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupPhone', step) && (
      <>
        <h1>telefones</h1>
        <input type="text" name="name" />
        <input type="text" name="name" />
        <button onClick={() => stepNextStep({ currentStep: 'InputGroupDoc' })}>
          Continuar
        </button>
      </>
    )
  )
}

export default InputGroupPhone
