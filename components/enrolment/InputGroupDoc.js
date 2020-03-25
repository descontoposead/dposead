import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupDoc = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupDoc', step) && (
      <>
        <div>
          <h1>Para te certificar no futuro</h1>
        </div>
        <div>
          <MaskedInput
            autoFocus
            placeholder="escreva seu cpf..."
            name="cpf"
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
          <input type="text" name="name" placeholder="escreva seu rg..." />
        </div>
        <div>
          <button
            onClick={() => stepNextStep({ currentStep: 'InputGroupBirth' })}
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
