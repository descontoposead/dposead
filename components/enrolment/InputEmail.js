import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputEmail = () => {
  const [step, setNextStep] = useSharedStep()
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
            onClick={() => setNextStep({ currentStep: 'InputName' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => setNextStep({ currentStep: 'InputGroupPhone' })}
          >
            É meu melhor e-mail
          </button>
        </div>
      </>
    )
  )
}

export default InputEmail
