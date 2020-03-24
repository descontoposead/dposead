import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputCivilStatus = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputCivilStatus', step) && (
      <>
        <div>
          <h1>Informação civil</h1>
        </div>
        <div>
          <label htmlFor="married">
            <input id="married" type="radio" name="civilStatus" /> Casado
          </label>
          <label htmlFor="single">
            <input id="single" type="radio" name="civilStatus" /> Solteiro
          </label>
        </div>
        <div>
          <button
            onClick={() => stepNextStep({ currentStep: 'InputProfession' })}
          >
            Continuar...
          </button>
        </div>
      </>
    )
  )
}

export default InputCivilStatus
