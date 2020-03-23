import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupDoc = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupDoc', step) && (
      <>
        <h1>Agora, documentos pessoais rg, cpf</h1>
        <input type="text" name="name" />
        <input type="text" name="name" />
        <button
          onClick={() => stepNextStep({ currentStep: 'InputGroupBirth' })}
        >
          Continuar
        </button>
      </>
    )
  )
}

export default InputGroupDoc
