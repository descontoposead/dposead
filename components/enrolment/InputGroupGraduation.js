import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputGroupGraduation = () => {
  const [step, stepNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputGroupGraduation', step) && (
      <>
        <div>
          <h1>Precisamos saber sobre a sua graduação</h1>
        </div>
        <div>
          <strong>Nome</strong>
          <input
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            autoFocus
            type="text"
            name="graduation"
            placeholder="escreva sua graduação"
          />
          <strong>Data de colação</strong>
          <MaskedInput
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            name="dateOfGraduate"
            placeholder="dia/mês/ano"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
        <div>
          <button
            className="prev"
            onClick={() => stepNextStep({ currentStep: 'InputFullAddress' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => stepNextStep({ currentStep: 'InputCourse' })}
          >
            Ultimos passos...
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

export default InputGroupGraduation
