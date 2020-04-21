import Head from 'next/head'
import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle, useSessionStorage } from 'react-use'

import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import withStepLayout from '../../components/StepLayout'
import postStep from '../../helpers/postStep'

const Step = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [validatesBeforeNavigation, setValidatesBeforeNavigation] = useState()
  const [stepPage] = useState({
    prev: '/matricular/me-encontre',
    next: '/matricular/formacao-academica',
  })

  const [values, setValues] = useSessionStorage('values', {})

  const refs = {
    stateInput: useRef(null),
    cityInput: useRef(null),
    neighInput: useRef(null),
    numberInput: useRef(null),
    streetInput: useRef(null),
  }

  useVibrate(vibrating, timers, isInfiniteLoop)

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
      navigationByStep: async () => {
        Array.from(
          document.querySelectorAll('button.next, button.prev')
        ).map((b) => b.setAttribute('disabled', 'disabled'))
        sessionStorage.setItem('values', JSON.stringify(values))
        await postStep({ email: values.email, address: values.address })
        window.location.assign(stepPage.next)
      },
      vibrateOnError: () => toggleVibrating(),
    })
  }, [])

  const mergeInputValue = (target) =>
    setValues(
      Object.assign(values, {
        address: Object.assign(values.address, {
          [target.name]: target.value,
        }),
      })
    )

  return (
    <>
      <Head>
        <link rel="prefetch" href={stepPage.next}></link>
      </Head>
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
            defaultValue={values.address?.state}
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
            defaultValue={values.address?.city}
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
            defaultValue={values.address?.neighborhood}
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
            defaultValue={values.address?.number}
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
            defaultValue={values.address?.street}
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
          onClick={() => window.location.assign(stepPage.prev)}
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

export default withStepLayout(Step, { progressValue: 52.5 })
