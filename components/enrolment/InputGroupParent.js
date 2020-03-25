import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupParent = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupParent', step) && (
      <>
        <div>
          <h1>Agora meu certificado fica lindo...</h1>
        </div>
        <div>
          <input
            autoFocus
            type="text"
            name="parentName"
            placeholder="nome do seu pai..."
          />
          <input
            type="text"
            name="motherName"
            placeholder="nome da sua mãe..."
          />
        </div>
        <div>
          <button
            onClick={() => stepNextStep({ currentStep: 'InputCivilStatus' })}
          >
            Vamos lá...
          </button>
        </div>
        <style jsx>{`
          div:nth-child(2) {
            height: 8vh;
          }
        `}</style>
      </>
    )
  )
}

export default InputGroupParent
