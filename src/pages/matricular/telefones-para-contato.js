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
    next: '/matricular/documentos-pessoais',
  })

  const [progressValue, setProgressValue] = useSessionStorage('progressValue')
  const [values, setValues] = useSessionStorage('values', {})

  const refs = {
    whatsappInput: useRef(null),
    phoneInput: useRef(null),
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
          inputEl: refs.phoneInput.current.inputElement,
          validator: () => [
            new RegExp(/^[1-9]{2}9?[0-9]{8}$/).test(
              refs.phoneInput.current.inputElement.value.replace(/\D/g, '')
            ),
            'invalid-value-error',
          ],
        }),
        () => ({
          inputEl: refs.whatsappInput.current.inputElement,
          validator: () => [
            new RegExp(/^[1-9]{2}9?[0-9]{8}$/).test(
              refs.whatsappInput.current.inputElement.value.replace(/\D/g, '')
            ),
            'invalid-value-error',
          ],
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
        <h1>Nos informe seu contato</h1>
      </div>
      <div>
        <div>
          {values.phone && (
            <label htmlFor="phone">Telefone que você informou</label>
          )}
          <MaskedInput
            ref={refs.phoneInput}
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
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
            ref={refs.whatsappInput}
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
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
        <button className="next" onClick={goToNext(validatesBeforeNavigation)}>
          Contatos OK
        </button>
      </div>
    </>
  )
}

export default withStepLayout(Step)
