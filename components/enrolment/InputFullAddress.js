import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import goToNext from '../../helpers/goToNext'

const InputFullAddress = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [optsNextStep, setOptNextStep] = useState()

  useVibrate(vibrating, timers, isInfiniteLoop)

  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputRef = useRef(null)

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    setOptNextStep({
      inputEl: () => inputRef.current,
      setNextFn: () => setNextStep({ currentStep: 'InputGroupGraduation' }),
      vibrateFn: () => toggleVibrating(),
    })

    //set cache value to input
    if (inputRef.current) {
      inputRef.current.value = values[inputRef.current.name] || ''
    }
  }, [step]) //on open step

  return (
    currentStepIs('InputFullAddress', step) && (
      <>
        <div>
          <h1>Encontramos você?</h1>
        </div>
        <div>
          <div>
            <label htmlFor="fullAdress"> É aqui que eu moro</label>
            <textarea
              ref={inputRef}
              onChange={({ currentTarget }) => assignNewValue(currentTarget)}
              autoComplete="off"
              autoFocus
              name="fullAddress"
              value="R PE Dionisio - 278 - Centro, Córrego novo, Minas Gerais"
            ></textarea>
            <strong className="hasError">
              Precisamos saber onde você está!
            </strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputZip' })}
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Isso mesmo!
          </button>
        </div>
      </>
    )
  )
}

export default InputFullAddress
