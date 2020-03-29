import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle } from 'react-use'
import MaskedInput from 'react-text-mask'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'
import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'

const InputGroupPhone = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [optsNextStep, setOptNextStep] = useState({
    inputGroup: [],
  })

  useVibrate(vibrating, timers, isInfiniteLoop)

  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputGroupRefs = {
    inputWhatsappRef: useRef(null),
    inputPhoneRef: useRef(null),
  }

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    setOptNextStep({
      inputGroup: [
        () => inputGroupRefs.inputPhoneRef.current.inputElement,
        () => inputGroupRefs.inputWhatsappRef.current.inputElement,
      ],
      setNextFn: () => setNextStep({ currentStep: 'InputGroupDoc' }),
      vibrateFn: () => toggleVibrating(),
    })

    if (inputGroupRefs.inputPhoneRef.current) {
      const { current } = inputGroupRefs.inputPhoneRef
      current.inputElement.value = values[current.inputElement.name] || ''
    }

    if (inputGroupRefs.inputWhatsappRef.current) {
      const { current } = inputGroupRefs.inputWhatsappRef
      current.inputElement.value = values[current.inputElement.name] || ''
    }
  }, [step])

  return (
    currentStepIs('InputGroupPhone', step) && (
      <>
        <div>
          <h1>Caso precisemos entrar em contato</h1>
        </div>
        <div>
          <div>
            {values.phone && (
              <label htmlFor="phone">Telefone que você informou</label>
            )}
            <MaskedInput
              ref={inputGroupRefs.inputPhoneRef}
              onChange={({ currentTarget }) => assignNewValue(currentTarget)}
              autoComplete="off"
              name="phone"
              placeholder="seu telefone..."
              autoFocus
              mask={[
                '(',
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
            <strong className="hasError">Você esqueceu o telefone!</strong>
          </div>
          <div>
            {values.whatsapp && (
              <label htmlFor="whatsapp">Whatsapp que você informou</label>
            )}
            <MaskedInput
              ref={inputGroupRefs.inputWhatsappRef}
              onChange={({ currentTarget }) => assignNewValue(currentTarget)}
              autoComplete="off"
              name="whatsapp"
              placeholder="seu whatsapp..."
              mask={[
                '(',
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
            <strong className="hasError">Você esqueceu o whatsapp!</strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputEmail' })}
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Podemos conversar
          </button>
        </div>
      </>
    )
  )
}

export default InputGroupPhone
