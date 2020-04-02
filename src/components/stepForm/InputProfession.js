import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import goToNext from '../../helpers/goToNext'

const InputProfession = () => {
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
      setNextFn: () => setNextStep({ currentStep: 'InputZip' }),
      vibrateFn: () => toggleVibrating(),
    })

    //set cache value to input
    if (inputRef.current) {
      inputRef.current.value = values[inputRef.current.name] || ''
    }
  }, [step]) //on open step

  return (
    currentStepIs('InputProfession', step) && (
      <>
        <div>
          <h1>O que você faz? (Profissão)</h1>
        </div>
        <div>
          <div>
            {values.profession && (
              <label htmlFor="profession">Você trabalha com</label>
            )}
            <textarea
              ref={inputRef}
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              autoComplete="off"
              autoFocus
              name="profession"
              placeholder="escreva aqui a sua profissão..."
            ></textarea>
            <strong className="hasError">Você precisa informar isso!</strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputCivilStatus' })}
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Essa é a minha profissão
          </button>
        </div>
      </>
    )
  )
}

export default InputProfession
