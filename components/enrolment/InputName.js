import { useRef } from 'react'
import { useVibrate, useToggle } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputName = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  useVibrate(vibrating, [300, 100, 200, 100, 500, 300], false)

  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputRef = useRef()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  const goToNext = (nextStep) => (e) => {
    e.preventDefault()

    const isValid = inputRef.current.value

    if (!isValid) {
      inputRef.current.classList.add('error')
      toggleVibrating()

      return
    }

    setNextStep({ currentStep: nextStep })
  }

  return (
    currentStepIs('InputName', step) && (
      <>
        <div>
          <h1>Qual é seu nome completo?</h1>
        </div>
        <div>
          <textarea
            ref={inputRef}
            onChange={({ currentTarget }) => assignNewValue(currentTarget)}
            autoComplete="off"
            autoFocus
            placeholder="escreva seu nome..."
            type="text"
            name="name"
          ></textarea>
          <strong className="hasError">Precisamos saber quem é você!</strong>
        </div>
        <div>
          <button className="next" onClick={goToNext('InputEmail')}>
            Este é meu nome
          </button>
        </div>
      </>
    )
  )
}

export default InputName
