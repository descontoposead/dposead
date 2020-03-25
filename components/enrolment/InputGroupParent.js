import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputGroupParent = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputGroupParent', step) && (
      <>
        <div>
          <h1>Agora meu certificado fica lindo...</h1>
        </div>
        <div>
          <input
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            autoFocus
            type="text"
            name="parentName"
            placeholder="nome do seu pai..."
          />
          <input
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            type="text"
            name="motherName"
            placeholder="nome da sua mãe..."
          />
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputGroupBirth' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => setNextStep({ currentStep: 'InputCivilStatus' })}
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
