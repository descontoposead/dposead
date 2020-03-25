import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupAddress = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupAddress', step) && (
      <>
        <div>
          <h1>Encontramos você?</h1>
        </div>
        <div>
          <textarea
            autoFocus
            name="name"
            value="R PE Dionisio - 278 - Centro, Córrego novo, Minas Gerais"
          ></textarea>
        </div>
        <div>
          <button
            onClick={() =>
              stepNextStep({ currentStep: 'InputGroupGraduation' })
            }
          >
            Isso mesmo!
          </button>
        </div>
        <style jsx>{`
          div:nth-child(2) {
            height: 20vh;
          }
        `}</style>
      </>
    )
  )
}

export default InputGroupAddress
