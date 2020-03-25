import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputName = () => {
  const [step, stepNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputName', step) && (
      <>
        <div>
          <h1>Qual é seu nome completo?</h1>
        </div>
        <div>
          <textarea
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            autoFocus
            placeholder="escreva seu nome..."
            type="text"
            name="name"
          ></textarea>
        </div>
        <div>
          <button onClick={() => stepNextStep({ currentStep: 'InputEmail' })}>
            Este é meu nome
          </button>
        </div>
      </>
    )
  )
}

export default InputName
