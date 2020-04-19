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
    next: '/matricular/telefones-para-contato',
  })

  const [progressValue, setProgressValue] = useSessionStorage('progressValue')
  const [values, setValues] = useSessionStorage('values', {})

  const refs = {
    nameInput: useRef(null),
    emailInput: useRef(null),
  }

  useVibrate(vibrating, timers, isInfiniteLoop)

  useEffect(function progressBarAfterInitPage() {
    setProgressValue(1)
  }, [])

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
          inputEl: refs.nameInput.current,
          validator: () => [
            new RegExp(/^[ ]*(.+[ ]+)+.+[ ]*$/).test(
              refs.nameInput.current.value
            ), //boolean validator
            'invalid-value-error', //class
          ],
        }),
        () => ({
          inputEl: refs.emailInput.current,
          validator: () => [
            new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(
              refs.emailInput.current.value
            ), //boolean validator
            'invalid-value-error', //class
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
        <h1>Olá, vamos começar!</h1>
      </div>
      <div>
        <div>
          {values.email && (
            <label htmlFor="email">E-mail que você informou</label>
          )}
          <input
            ref={refs.emailInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.toLowerCase()
              mergeInputValue(currentTarget)
            }}
            autoComplete="off"
            autoFocus
            type="text"
            placeholder="escreva seu email..."
            name="email"
          />
          <strong className="hasEmptyError">
            Você não adicionou um e-mail!
          </strong>
          <strong className="hasInvalidError">
            Precisa ser um e-mail válido!
          </strong>
        </div>
        <div>
          {values.name && (
            <label htmlFor="dateOfBirth">Nome que você informou</label>
          )}
          <input
            ref={refs.nameInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.replace(
                /(?:^|\s)\S/g,
                (word) => word.toUpperCase()
              )
              mergeInputValue(currentTarget)
            }}
            autoComplete="off"
            autoFocus
            placeholder="escreva seu nome..."
            type="text"
            name="name"
          />
          <strong className="hasEmptyError">
            Precisamos saber quem é você!
          </strong>
          <strong className="hasInvalidError">
            Tem certeza que este é seu nome completo?
          </strong>
        </div>
      </div>
      <div>
        <button className="next" onClick={goToNext(validatesBeforeNavigation)}>
          Próximo
        </button>
      </div>
    </>
  )
}

export default withStepLayout(Step)
