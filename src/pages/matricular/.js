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
    next: '/matricular/passo-quando-onde-nasceu',
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
      inputGroup: [],
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
      <form action=""></form>
    </>
  )
}

export default withStepLayout(Step)
