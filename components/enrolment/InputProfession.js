import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputProfession = () => {
  const [step, stepNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputProfession', step) && (
      <>
        <div>
          <h1>O que você faz? (Profissão)</h1>
        </div>
        <div>
          <input
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            autoFocus
            type="text"
            name="profession"
            placeholder="escreva aqui..."
          />
        </div>
        <div>
          <button onClick={() => stepNextStep({ currentStep: 'InputZip' })}>
            Este é meu nome
          </button>
        </div>
      </>
    )
  )
}

export default InputProfession
