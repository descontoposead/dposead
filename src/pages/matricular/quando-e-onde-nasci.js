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
    next: '/matricular/quem-sao-meus-pais',
  })

  const [progressValue, setProgressValue] = useSessionStorage('progressValue')
  const [values, setValues] = useSessionStorage('values', {})

  const refs = {
    stateOfBirthInput: useRef(null),
    cityOfBirthInput: useRef(null),
    dateOfBirthInput: useRef(null),
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
          inputEl: refs.stateOfBirthInput.current,
          validator: () => [
            new RegExp(
              /^(?:A[CLPM]|BA|CE|DF|ES|GO|M[ATSG]|P[RBAEI]|R[JNSOR]|S[CEP]|TO)$/
            ).test(refs.stateOfBirthInput.current.value),
            'invalid-value-error',
          ],
        }),
        () => ({
          inputEl: refs.cityOfBirthInput.current,
        }),
        () => ({
          inputEl: refs.dateOfBirthInput.current.inputElement,
          validator: () => [
            (() => {
              try {
                return new RegExp(
                  /[12][0-9]{3}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/
                ).test(
                  new Date(
                    refs.dateOfBirthInput.current.inputElement.value.replace(
                      /(\d{2})\/(\d{2})\/(\d{4})/,
                      '$2/$1/$3'
                    )
                  )
                    .toISOString()
                    .replace(/=?T.*/, '')
                )
              } catch (e) {
                return false
              }
            })(),
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
        <h1>Necessário para seu certificado</h1>
      </div>
      <div>
        <div>
          {values.stateOfBirth && (
            <label htmlFor="stateOfBirth">O estado que você nasceu</label>
          )}
          <input
            ref={refs.stateOfBirthInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.toUpperCase()
              mergeInputValue(currentTarget)
            }}
            autoComplete="off"
            autoFocus
            name="stateOfBirth"
            type="text"
            placeholder="estado que vc nasceu..."
          />
          <strong className="hasEmptyError">Faltou o estado aqui!</strong>
          <strong className="hasInvalidError">
            Digite a sigla de seu estado. Ex: MG
          </strong>
        </div>
        <div>
          {values.cityOfBirth && (
            <label htmlFor="cityOfBirth">A cidade que você nasceu</label>
          )}
          <input
            ref={refs.cityOfBirthInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.replace(
                /(?:^|\s)\S/g,
                (word) => word.toUpperCase()
              )
              mergeInputValue(currentTarget)
            }}
            type="text"
            name="cityOfBirth"
            placeholder="cidade que vc nasceu..."
          />
          <strong className="hasError">Faltou a cidade aqui!</strong>
        </div>
        <div>
          <label htmlFor="dateOfBirth">Quando você nasceu?</label>
          <MaskedInput
            id="dateOfBirth"
            ref={refs.dateOfBirthInput}
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
            autoComplete="off"
            name="dateOfBirth"
            placeholder="dia/mês/ano"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
          <strong className="hasEmptyError">
            Precisamos saber quando você nasceu!
          </strong>
          <strong className="hasInvalidError">Essa data não é válida.</strong>
        </div>
      </div>
      <div>
        <button
          className="prev"
          onClick={() =>
            setNextStep({
              currentStep: 'InputGroupDoc',
              progressValue: step.progressValue - 7.69,
              values,
            })
          }
        >
          Voltar
        </button>
        <button className="next" onClick={goToNext(validatesBeforeNavigation)}>
          Continuar...
        </button>
      </div>
    </>
  )
}

export default withStepLayout(Step)
