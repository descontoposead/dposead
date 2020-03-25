import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputGroupBirth = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputGroupBirth', step) && (
      <>
        <div>
          <h1>Também necessário para seu certificado</h1>
        </div>
        <div>
          <input
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            autoFocus
            name="stateOfBirth"
            type="text"
            placeholder="estado que vc nasceu..."
          />
          <input type="text" placeholder="cidade que vc nasceu..." />
          <strong>Quando?</strong>
          <MaskedInput
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            name="dateOfBirth"
            placeholder="dia/mês/ano"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputGroupDoc' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => setNextStep({ currentStep: 'InputGroupParent' })}
          >
            Estou indo bem
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

export default InputGroupBirth
