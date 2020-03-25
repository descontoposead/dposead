import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputZip = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputZip', step) && (
      <>
        <div>
          <h1>Qual é seu cep?</h1>
        </div>
        <div>
          <MaskedInput
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            autoFocus
            name="zipCode"
            placeholder="escreva o cep..."
            mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputProfession' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => setNextStep({ currentStep: 'InputFullAddress' })}
          >
            Este é meu nome
          </button>
        </div>
      </>
    )
  )
}

export default InputZip
