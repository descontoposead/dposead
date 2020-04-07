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
        () => ({
          inputEl: inputGroupRefs.inputPersonalDocumentRef.current.inputElement,
          validator: () => {
            const isValid = (doc) => {
              if (
                !doc ||
                doc.length != 11 ||
                doc == '00000000000' ||
                doc == '11111111111' ||
                doc == '22222222222' ||
                doc == '33333333333' ||
                doc == '44444444444' ||
                doc == '55555555555' ||
                doc == '66666666666' ||
                doc == '77777777777' ||
                doc == '88888888888' ||
                doc == '99999999999'
              )
                return false
              let sum = 0
              let rest
              for (let i = 1; i <= 9; i++)
                sum = sum + parseInt(doc.substring(i - 1, i)) * (11 - i)
              rest = (sum * 10) % 11
              if (rest == 10 || rest == 11) rest = 0
              if (rest != parseInt(doc.substring(9, 10))) return false
              sum = 0
              for (let i = 1; i <= 10; i++)
                sum = sum + parseInt(doc.substring(i - 1, i)) * (12 - i)
              rest = (sum * 10) % 11
              if (rest == 10 || rest == 11) rest = 0
              if (rest != parseInt(doc.substring(10, 11))) return false
              return true
            }

            return [
              isValid(
                inputGroupRefs.inputPersonalDocumentRef.current.inputElement.value.replace(
                  /\D/g,
                  ''
                )
              ),
              'invalid-value-error',
            ]
          },
        }),
        () => ({
          inputEl: inputGroupRefs.inputPersonalRegistryRef.current,
        }),
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
            <strong className="hasEmptyError">O CPF é essencial!</strong>
            <strong className="hasInvalidError">
              Este CPF veio da receita federal?
            </strong>
          </div>
          <div>
            {values.personalRegistry && (
              <label htmlFor="personalRegistry">RG que você informou</label>
            )}
            <input
              ref={inputGroupRefs.inputPersonalRegistryRef}
              onChange={({ currentTarget }) => {
                currentTarget.value = currentTarget.value.toUpperCase()
                controlInputValue(currentTarget)
              }}
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
