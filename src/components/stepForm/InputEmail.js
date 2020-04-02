import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import goToNext from '../../helpers/goToNext'

const InputEmail = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [optsNextStep, setOptNextStep] = useState()

  useVibrate(vibrating, timers, isInfiniteLoop)

  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputRef = useRef(null)

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    setOptNextStep({
      inputEl: () => inputRef.current,
      setNextFn: () => setNextStep({ currentStep: 'InputGroupPhone' }),
      vibrateFn: () => toggleVibrating(),
    })

    //set cache value to input
    if (inputRef.current) {
      inputRef.current.value = values[inputRef.current.name] || ''
    }
  }, [step]) //on open step

  return (
    currentStepIs('InputEmail', step) && (
      <>
        <div>
          <h1>Qual e-mail você usa?</h1>
        </div>
        <div>
          <div>
            {values.email && (
              <label htmlFor="email">E-mail que você informou</label>
            )}
            <input
              ref={inputRef}
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              autoComplete="off"
              autoFocus
              type="text"
              placeholder="escreva seu email..."
              name="email"
            />
            <strong className="hasError">Você não adicionou um e-mail!</strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputName' })}
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            É meu melhor e-mail
          </button>
        </div>
      </>
    )
  )
}

export default InputEmail
