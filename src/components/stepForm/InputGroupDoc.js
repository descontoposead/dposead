import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'
import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'

const InputGroupDoc = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [optsNextStep, setOptNextStep] = useState({
    inputGroup: [],
  })

  useVibrate(vibrating, timers, isInfiniteLoop)

  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputGroupRefs = {
    inputPersonalDocumentRef: useRef(null),
    inputPersonalRegistryRef: useRef(null),
  }

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    setOptNextStep({
      inputGroup: [
        () => inputGroupRefs.inputPersonalDocumentRef.current.inputElement,
        () => inputGroupRefs.inputPersonalRegistryRef.current,
      ],
      setNextFn: () => setNextStep({ currentStep: 'InputGroupBirth' }),
      vibrateFn: () => toggleVibrating(),
    })

    if (inputGroupRefs.inputPersonalDocumentRef.current) {
      const { current } = inputGroupRefs.inputPersonalDocumentRef
      current.inputElement.value = values[current.inputElement.name] || ''
    }

    if (inputGroupRefs.inputPersonalRegistryRef.current) {
      const { current } = inputGroupRefs.inputPersonalRegistryRef
      current.value = values[current.name] || ''
    }
  }, [step])

  return (
    currentStepIs('InputGroupDoc', step) && (
      <>
        <div>
          <h1>Para te certificar no futuro</h1>
        </div>
        <div>
          <div>
            {values.personalDocument && (
              <label htmlFor="personalDocument">CPF que você informou</label>
            )}
            <MaskedInput
              ref={inputGroupRefs.inputPersonalDocumentRef}
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              autoComplete="off"
              autoFocus
              placeholder="escreva seu cpf..."
              name="personalDocument"
              mask={[
                /\d/,
                /\d/,
                /\d/,
                '.',
                /\d/,
                /\d/,
                /\d/,
                '.',
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
              ]}
            />
            <strong className="hasError">O CPF é essencial!</strong>
          </div>
          <div>
            {values.personalRegistry && (
              <label htmlFor="personalRegistry">RG que você informou</label>
            )}
            <input
              ref={inputGroupRefs.inputPersonalRegistryRef}
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              autoComplete="off"
              type="text"
              name="personalRegistry"
              placeholder="escreva seu rg..."
            />
            <strong className="hasError">O RG é essencial!</strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputGroupPhone' })}
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Quase pronto
          </button>
        </div>
      </>
    )
  )
}

export default InputGroupDoc
