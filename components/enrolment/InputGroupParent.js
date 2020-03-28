import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'

const InputGroupParent = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [optsNextStep, setOptNextStep] = useState({
    inputGroup: [],
  })

  useVibrate(vibrating, timers, isInfiniteLoop)

  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputGroupRefs = {
    inputParentNameRef: useRef(null),
    inputMotherNameRef: useRef(null),
  }

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    setOptNextStep({
      inputGroup: [
        () => inputGroupRefs.inputParentNameRef.current,
        () => inputGroupRefs.inputMotherNameRef.current,
      ],
      setNextFn: () => setNextStep({ currentStep: 'InputCivilStatus' }),
      vibrateFn: () => toggleVibrating(),
    })

    if (inputGroupRefs.inputParentNameRef.current) {
      const { current } = inputGroupRefs.inputParentNameRef
      current.value = values[current.name] || ''
    }

    if (inputGroupRefs.inputMotherNameRef.current) {
      const { current } = inputGroupRefs.inputMotherNameRef
      current.value = values[current.name] || ''
    }
  }, [step])

  return (
    currentStepIs('InputGroupParent', step) && (
      <>
        <div>
          <h1>Agora meu certificado fica lindo...</h1>
        </div>
        <div>
          <div>
            {values.parentName && (
              <label htmlFor="parentName">O nome do meu pai</label>
            )}
            <input
              ref={inputGroupRefs.inputParentNameRef}
              onChange={({ currentTarget }) => assignNewValue(currentTarget)}
              autoComplete="off"
              autoFocus
              type="text"
              name="parentName"
              placeholder="nome do seu pai..."
            />
            <strong className="hasError">Qual é o nome do seu pai?</strong>
          </div>
          <div>
            {values.motherName && (
              <label htmlFor="motherName">O nome da minha mãe</label>
            )}
            <input
              ref={inputGroupRefs.inputMotherNameRef}
              onChange={({ currentTarget }) => assignNewValue(currentTarget)}
              autoComplete="off"
              type="text"
              name="motherName"
              placeholder="nome da sua mãe..."
            />
            <strong className="hasError">Qual é o nome da sua mãe?</strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputGroupBirth' })}
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Vamos lá...
          </button>
        </div>
      </>
    )
  )
}

export default InputGroupParent
