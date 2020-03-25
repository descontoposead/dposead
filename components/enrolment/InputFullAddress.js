import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputFullAddress = () => {
  const [step, stepNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputFullAddress', step) && (
      <>
        <div>
          <h1>Encontramos você?</h1>
        </div>
        <div>
          <textarea
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            autoFocus
            name="fullAddress"
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

export default InputFullAddress
