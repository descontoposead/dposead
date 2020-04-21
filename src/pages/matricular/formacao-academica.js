import Head from 'next/head'
import { useRef, useEffect, useState } from 'react'
import { useVibrate, useToggle, useSessionStorage } from 'react-use'
import MaskedInput from 'react-text-mask'

import goToNext from '../../helpers/goToNext'
import { timers, isInfiniteLoop } from '../../helpers/vibrateTimer'
import withStepLayout from '../../components/StepLayout'
import postStep from '../../helpers/postStep'

const Step = () => {
  const [vibrating, toggleVibrating] = useToggle(false)
  const [validatesBeforeNavigation, setValidatesBeforeNavigation] = useState()
  const [stepPage] = useState({
    prev: '/matricular/meu-endereco',
    next: '/matricular/escolha-um-novo-curso',
  })

  const [values, setValues] = useSessionStorage('values', {})

  const refs = {
    graduationInput: useRef(null),
    dateOfGraduationInput: useRef(null),
  }

  useVibrate(vibrating, timers, isInfiniteLoop)

  useEffect(function validateBeforeNavigation() {
    setValidatesBeforeNavigation({
      inputGroup: [],
      navigationByStep: async () => {
        Array.from(
          document.querySelectorAll('button.next, button.prev')
        ).map((b) => b.setAttribute('disabled', 'disabled'))
        sessionStorage.setItem('values', JSON.stringify(values))
        await postStep({
          email: values.email,
          graduation: values.graduation,
          dateOfGraduation: values.dateOfGraduation,
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
        <h1>Precisamos saber sobre a sua graduação</h1>
      </div>
      <div>
        <div>
          <label htmlFor="graduation">Nome da sua graduação</label>
          <textarea
            ref={refs.graduationInput}
            onChange={({ currentTarget }) => {
              mergeInputValue(currentTarget)
              currentTarget.value = currentTarget.value.replace(
                /(?:^|\s)\S/g,
                (word) => word.toUpperCase()
              )
            }}
            defaultValue={values.graduation}
            autoComplete="off"
            autoFocus
            type="text"
            name="graduation"
            placeholder="escreva sua graduação"
          ></textarea>
          <strong className="hasError">
            Isso é importante para o seu certificado!
          </strong>
        </div>
        <div>
          <label htmlFor="dateOfGraduation">Quando eu colei grau</label>
          <MaskedInput
            ref={refs.dateOfGraduationInput}
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
            defaultValue={values.dateOfGraduation}
            autoComplete="off"
            name="dateOfGraduation"
            placeholder="dia/mês/ano"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
          <strong className="hasError">Precisamos saber essa data!</strong>
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
          Ultimos passos...
        </button>
      </div>
    </>
  )
}

export default withStepLayout(Step, { progressValue: 60 })
