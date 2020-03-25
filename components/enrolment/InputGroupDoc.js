import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputGroupDoc = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputGroupDoc', step) && (
      <>
        <div>
          <h1>Para te certificar no futuro</h1>
        </div>
        <div>
          <MaskedInput
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            autoFocus
            placeholder="escreva seu cpf..."
            name="personalDocument"
            mask={[
              /\d/,
              /\d/,
              /\d/,
              '.',
              /\d/,
              /\d/,
              /\d/,
              '.',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
            ]}
          />
          <input
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            type="text"
            name="personalRegistry"
            placeholder="escreva seu rg..."
          />
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputGroupPhone' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => setNextStep({ currentStep: 'InputGroupBirth' })}
          >
            Quase pronto
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

export default InputGroupDoc
