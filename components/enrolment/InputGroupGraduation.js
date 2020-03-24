import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const InputGroupGraduation = () => {
  const [step, stepNextStep] = useSharedStep()

  return (
    currentStepIs('InputGroupGraduation', step) && (
      <>
        <div>
          <h1>Precisamos saber sobre a sua graduação</h1>
        </div>
        <div>
          <strong>Nome</strong>
          <input
            autoFocus
            type="text"
            name="name"
            placeholder="escreva sua graduação"
          />
          <strong>Data de colação</strong>
          <MaskedInput
            name="dateOfGraduate"
            placeholder="dia/mês/ano"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
        <div>
          <button onClick={() => stepNextStep({ currentStep: 'InputCourse' })}>
            Ultimos passos...
          </button>
        </div>
      </>
    )
  )
}

export default InputGroupGraduation
