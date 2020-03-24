import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputZip = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputZip', step) && (
      <>
        <div>
          <h1>Qual é seu cep?</h1>
        </div>
        <div>
          <MaskedInput
            autoFocus
            name="zipCode"
            placeholder="escreva o cep..."
            mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
        <div>
          <button
            onClick={() => stepNextStep({ currentStep: 'InputGroupAddress' })}
          >
            Este é meu nome
          </button>
        </div>
      </>
    )
  )
}

export default InputZip
