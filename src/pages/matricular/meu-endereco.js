import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle, useSessionStorage } from 'react-use'

import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import withStepLayout from '../../components/StepLayout'

const Step = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [validatesBeforeNavigation, setValidatesBeforeNavigation] = useState()
  const [stepPage] = useState({
    prev: '',
    next: '/matricular/',
  })

  const [progressValue, setProgressValue] = useSessionStorage('progressValue')
  const [values, setValues] = useSessionStorage('values', {})

  const refs = {
    stateInput: useRef(null),
    cityInput: useRef(null),
    neighInput: useRef(null),
    numberInput: useRef(null),
    streetInput: useRef(null),
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
          inputEl: refs.stateInput.current,
          validator: () => [
            new RegExp(
              /^(?:A[CLPM]|BA|CE|DF|ES|GO|M[ATSG]|P[RBAEI]|R[JNSOR]|S[CEP]|TO)$/
            ).test(refs.stateInput.current.value),
            'invalid-value-error',
          ],
        }),
        () => ({
          inputEl: refs.cityInput.current,
        }),
        () => ({
          inputEl: refs.neighInput.current,
        }),
        () => ({
          inputEl: refs.numberInput.current,
        }),
        () => ({
          inputEl: refs.streetInput.current,
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
        <h1>Achamos você?</h1>
      </div>
      <div>
        <div>
          {values.address?.state && (
            <label htmlFor="state">Este é o estado que você mora</label>
          )}
          <input
            ref={refs.stateInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.toUpperCase()
              mergeInputValue(currentTarget)
            }}
            autoComplete="none"
            autoFocus
            type="text"
            name="state"
            placeholder="estado (sigla)..."
          />
          <strong className="hasEmptyError">Em qual estado você mora?</strong>
          <strong className="hasInvalidError">Este estado existe?</strong>
        </div>
        <div>
          {values.address?.city && (
            <label htmlFor="city">A cidade que você mora</label>
          )}
          <input
            ref={refs.cityInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.replace(
                /(?:^|\s)\S/g,
                (word) => word.toUpperCase()
              )
              mergeInputValue(currentTarget)
            }}
            autoComplete="none"
            type="text"
            name="city"
            placeholder="cidade..."
          />
          <strong className="hasError">Em qual cidade você mora?</strong>
        </div>
        <div>
          {values.address?.neighborhood && (
            <label htmlFor="neighborhood">Você mora neste bairro</label>
          )}
          <input
            ref={refs.neighInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.replace(
                /(?:^|\s)\S/g,
                (word) => word.toUpperCase()
              )
              mergeInputValue(currentTarget)
            }}
            autoComplete="none"
            type="text"
            name="neighborhood"
            placeholder="bairro..."
          />
          <strong className="hasError">Qual é o bairro que você mora?</strong>
        </div>
        <div>
          {values.address?.number && (
            <label htmlFor="number">O número da sua residência</label>
          )}
          <input
            ref={refs.numberInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.replace(
                /(?:^|\s)\S/g,
                (word) => word.toUpperCase()
              )
              mergeInputValue(currentTarget)
            }}
            autoComplete="none"
            type="text"
            name="number"
            placeholder="número.."
          />
          <strong className="hasError">
            Qual é o número da sua residência?
          </strong>
        </div>
        <div>
          {values.address?.street && (
            <label htmlFor="street">A rua que você mora</label>
          )}
          <input
            ref={refs.streetInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.replace(
                /(?:^|\s)\S/g,
                (word) => word.toUpperCase()
              )
              mergeInputValue(currentTarget)
            }}
            autoComplete="none"
            type="text"
            name="street"
            placeholder="rua..."
          />
          <strong className="hasError">Qual é o a rua que você está?</strong>
        </div>
      </div>
      <div>
        <button
          className="prev"
          onClick={() =>
            setNextStep({
              currentStep: 'InputZip',
              progressValue: step.progressValue - 7.69,
              values,
            })
          }
        >
          Voltar
        </button>
        <button className="next" onClick={goToNext(validatesBeforeNavigation)}>
          Este é o meu endereço
        </button>
      </div>
    </>
  )
}

export default withStepLayout(Step)
