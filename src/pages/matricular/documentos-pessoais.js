import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle, useSessionStorage } from 'react-use'
import MaskedInput from 'react-text-mask'

import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import withStepLayout from '../../components/StepLayout'

const Step = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [validatesBeforeNavigation, setValidatesBeforeNavigation] = useState()
  const [stepPage] = useState({
    prev: '',
    next: '/matricular/quando-e-onde-nasci',
  })

  const [progressValue, setProgressValue] = useSessionStorage('progressValue')
  const [values, setValues] = useSessionStorage('values', {})

  const refs = {
    personalDocumentInput: useRef(null),
    personalRegistryInput: useRef(null),
  }

  useVibrate(vibrating, timers, isInfiniteLoop)

  useEffect(function cacheInputValues() {
    Object.keys(refs).forEach((ref) => {
      if (refs[ref].current) {
        const { current } = refs[ref]
        current.value = values[current.name] || ''
      }
    })
  }, [])

  useEffect(function validateBeforeNavigation() {
    setValidatesBeforeNavigation({
      inputGroup: [
        () => ({
          inputEl: refs.personalDocumentInput.current.inputElement,
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
                refs.personalDocumentInput.current.inputElement.value.replace(
                  /\D/g,
                  ''
                )
              ),
              'invalid-value-error',
            ]
          },
        }),
        () => ({
          inputEl: refs.personalRegistryInput.current,
        }),
      ],
      navigationByStep: () => {
        setProgressValue(progressValue + 7.69)
        setValues(values)
        window.location.assign(stepPage.next)
      },
      vibrateOnError: () => toggleVibrating(),
    })
  }, [])

  const mergeInputValue = (target) =>
    setValues(Object.assign(values, { [target.name]: target.value }))

  return (
    <>
      <div>
        <h1>Para sua segurança preencha:</h1>
      </div>
      <div>
        <div>
          {values.personalDocument && (
            <label htmlFor="personalDocument">CPF que você informou</label>
          )}
          <MaskedInput
            ref={refs.personalDocumentInput}
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
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
          <strong className="hasInvalidError">Desculpe, CPF inválido.</strong>
        </div>
        <div>
          {values.personalRegistry && (
            <label htmlFor="personalRegistry">RG que você informou</label>
          )}
          <input
            ref={refs.personalRegistryInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.toUpperCase()
              mergeInputValue(currentTarget)
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
          onClick={() =>
            setNextStep({
              currentStep: 'InputGroupPhone',
              progressValue: step.progressValue - 7.69,
              values,
            })
          }
        >
          Voltar
        </button>
        <button className="next" onClick={goToNext(validatesBeforeNavigation)}>
          Quase pronto
        </button>
      </div>
    </>
  )
}

export default withStepLayout(Step)
