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
    prev: '/matricular/quando-e-onde-nasci',
    next: '/matricular/me-encontre',
  })
  const [values, setValues] = useSessionStorage('values', {})

  const refs = {
    parentNameInput: useRef(null),
    motherNameInput: useRef(null),
  }

  useVibrate(vibrating, timers, isInfiniteLoop)

  useEffect(function validateBeforeNavigation() {
    setValidatesBeforeNavigation({
      inputGroup: [
        () => ({
          inputEl: refs.parentNameInput.current,
        }),
        () => ({
          inputEl: refs.motherNameInput.current,
        }),
      ],
      navigationByStep: async () => {
        Array.from(
          document.querySelectorAll('button.next, button.prev')
        ).map((b) => b.setAttribute('disabled', 'disabled'))
        sessionStorage.setItem('values', JSON.stringify(values))
        await postStep({
          email: values.email,
          parentName: values.parentName,
          motherName: values.motherName,
        })
        window.location.assign(stepPage.next)
      },
      vibrateOnError: () => toggleVibrating(),
    })
  }, [])

  const mergeInputValue = (target) =>
    setValues(Object.assign(values, { [target.name]: target.value }))

  return (
    <>
      <Head>
        <link rel="prefetch" href={stepPage.next}></link>
      </Head>
      <div>
        <h1>E nessário que informe sua filiação</h1>
      </div>
      <div>
        <div>
          {values.parentName && (
            <label htmlFor="parentName">O nome do meu pai</label>
          )}
          <textarea
            ref={refs.parentNameInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.replace(
                /(?:^|\s)\S/g,
                (word) => word.toUpperCase()
              )
              mergeInputValue(currentTarget)
            }}
            defaultValue={values.parentName}
            autoComplete="off"
            autoFocus
            type="text"
            name="parentName"
            placeholder="nome do seu pai..."
          ></textarea>
          <strong className="hasError">Qual é o nome do seu pai?</strong>
        </div>
        <div>
          {values.motherName && (
            <label htmlFor="motherName">O nome da minha mãe</label>
          )}
          <textarea
            ref={refs.motherNameInput}
            onChange={({ currentTarget }) => {
              currentTarget.value = currentTarget.value.replace(
                /(?:^|\s)\S/g,
                (word) => word.toUpperCase()
              )
              mergeInputValue(currentTarget)
            }}
            defaultValue={values.motherName}
            autoComplete="off"
            type="text"
            name="motherName"
            placeholder="nome da sua mãe..."
          ></textarea>
          <strong className="hasError">Qual é o nome da sua mãe?</strong>
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
          Vamos lá...
        </button>
      </div>
    </>
  )
}

export default withStepLayout(Step, { progressValue: 37.5 })
