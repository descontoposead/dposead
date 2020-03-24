import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupBirth = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupBirth', step) && (
      <>
        <div>
          <h1>Também necessário para seu certificado</h1>
        </div>
        <div>
          <input autoFocus type="text" placeholder="estado que vc nasceu..." />
          <input type="text" placeholder="cidade que vc nasceu..." />
          <strong>Quando?</strong>
          <MaskedInput
            name="dateOfBirth"
            placeholder="dia/mês/ano"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
        <div>
          <button
            onClick={() => stepNextStep({ currentStep: 'InputGroupParent' })}
          >
            Estou indo bem
          </button>
        </div>
      </>
    )
  )
}

export default InputGroupBirth
