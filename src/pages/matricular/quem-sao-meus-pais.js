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
    next: '/matricular/me-encontre',
  })

  const [progressValue, setProgressValue] = useSessionStorage('progressValue')
  const [values, setValues] = useSessionStorage('values', {})

  const refs = {
    parentNameInput: useRef(null),
    motherNameInput: useRef(null),
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
          inputEl: refs.parentNameInput.current,
        }),
        () => ({
          inputEl: refs.motherNameInput.current,
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
          onClick={() =>
            setNextStep({
              currentStep: 'InputGroupBirth',
              progressValue: step.progressValue - 7.69,
              values,
            })
          }
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

export default withStepLayout(Step)
