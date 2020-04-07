import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'

const InputName = () => {
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
      setNextFn: () => setNextStep({ currentStep: 'InputEmail' }),
      vibrateFn: () => toggleVibrating(),
      validator: () => [
        new RegExp(/^[ ]*(.+[ ]+)+.+[ ]*$/).test(inputRef.current.value), //boolean validator
        'invalid-value-error', //class
      ],
    })

    //set cache value to input
    if (inputRef.current) {
      inputRef.current.value = values[inputRef.current.name] || ''
    }
  }, [step]) //on open step

  return (
    currentStepIs('InputName', step) && (
      <>
        <div>
          <h1>Qual é seu nome completo?</h1>
        </div>
        <div>
          <div>
            {values.name && (
              <label htmlFor="dateOfBirth">Nome que você informou</label>
            )}
            <textarea
              ref={inputRef}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.replace(
                  /(?:^|\s)\S/g,
                  (word) => word.toUpperCase()
                )
                controlInputValue(currentTarget)
              }}
              autoComplete="off"
              autoFocus
              placeholder="escreva seu nome..."
              type="text"
              name="name"
            ></textarea>
            <strong className="hasEmptyError">
              Precisamos saber quem é você!
            </strong>
            <strong className="hasInvalidError">
              Tem certeza que este é seu nome completo?
            </strong>
          </div>
        </div>
        <div>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Este é meu nome
          </button>
        </div>
      </>
    )
  )
}

export default InputName
