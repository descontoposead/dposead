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

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    setOptNextStep({
      inputGroup: [
        () => ({
          inputEl: inputGroupRefs.inputPhoneRef.current.inputElement,
          validator: () => [
            new RegExp(/^[1-9]{2}9?[0-9]{8}$/).test(
              inputGroupRefs.inputPhoneRef.current.inputElement.value.replace(
                /\D/g,
                ''
              )
            ),
            'invalid-value-error',
          ],
        }),
        () => ({
          inputEl: inputGroupRefs.inputWhatsappRef.current.inputElement,
          validator: () => [
            new RegExp(/^[1-9]{2}9?[0-9]{8}$/).test(
              inputGroupRefs.inputWhatsappRef.current.inputElement.value.replace(
                /\D/g,
                ''
              )
            ),
            'invalid-value-error',
          ],
        }),
      ],
      setNextFn: () =>
        setNextStep({
          currentStep: 'InputGroupDoc',
          progressValue: step.progressValue + 7.69,
          values,
        }),
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
          <h1>Nos informe seu contato</h1>
        </div>
        <div>
          <div>
            {values.phone && (
              <label htmlFor="phone">Telefone que você informou</label>
            )}
            <MaskedInput
              ref={inputGroupRefs.inputPhoneRef}
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
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
            <strong className="hasEmptyError">Você esqueceu o telefone!</strong>
            <strong className="hasInvalidError">
              verifique se seu número está correto!
            </strong>
          </div>
          <div>
            {values.whatsapp && (
              <label htmlFor="whatsapp">Whatsapp que você informou</label>
            )}
            <MaskedInput
              ref={inputGroupRefs.inputWhatsappRef}
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
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
            <strong className="hasEmptyError">Você esqueceu o whatsapp!</strong>
            <strong className="hasInvalidError">
              Precisamos de um Whatsapp válido, como conversariamos?
            </strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() =>
              setNextStep({
                currentStep: 'InputLead',
                progressValue: step.progressValue - 7.69,
                values,
              })
            }
          >
            Voltar
          </button>
          <button className="next" onClick={goToNext(optsNextStep)}>
            Contatos OK
          </button>
        </div>
      </>
    )
  )
}

export default InputGroupPhone
