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
        <style jsx>{`
          div:nth-child(2) {
            flex-direction: column;
          }
          div:nth-child(2) label input {
            margin-right: 10px;
            width: 30px;
          }
          label {
            display: flex;
            flex-wrap: nowrap;
            height: 60px;
            align-items: center;
            font-size: 2rem;
          }
        `}</style>
      </>
    )
  )
}

export default InputCivilStatus
