import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputEmail = () => {
  const [step, stepNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputEmail', step) && (
      <>
        <div>
          <h1>Qual e-mail você usa?</h1>
        </div>
        <div>
          <input
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            autoFocus
            type="text"
            placeholder="escreva seu email..."
            name="email"
          />
        </div>
        <div>
          <button
            className="prev"
            onClick={() => stepNextStep({ currentStep: 'InputName' })}
          >
            Voltar
          </button>
          <button
            className="next"
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
