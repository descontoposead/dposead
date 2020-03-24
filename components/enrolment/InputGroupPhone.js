import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupPhone = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupPhone', step) && (
      <>
        <div>
          <h1>Caso precisemos entrar em contato</h1>
        </div>
        <div>
          <MaskedInput
            name="phone"
            placeholder="seu telefone..."
            autoFocus
            mask={[
              '(',
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
          />
          <MaskedInput
            name="whatsapp"
            placeholder="seu whatsapp..."
            mask={[
              '(',
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
          />
        </div>
        <div>
          <button
            onClick={() => stepNextStep({ currentStep: 'InputGroupDoc' })}
          >
            Podemos conversar
          </button>
        </div>
      </>
    )
  )
}

export default InputGroupPhone
