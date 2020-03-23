import { useEffect } from 'react'

import { useSharedStep } from '../../hooks/useSharedStep'
import InputName from './InputName'
import InputEmail from './InputEmail'
import InputGroupPhone from './InputGroupPhone'
import InputGroupDoc from './InputGroupDoc'
import InputGroupBirth from './InputGroupBirth'
import InputGroupParent from './InputGroupParent'
import InputCivilStatus from './InputCivilStatus'
import InputProfession from './InputProfession'
import InputZip from './InputZip'
import InputGroupAddress from './InputGroupAddress'
import InputGroupGraduation from './InputGroupGraduation'
import InputCourse from './InputCourse'
import InputGroupPayment from './InputGroupPayment'
import Resume from './Resume'

const Form = () => {
  const [step, _] = useSharedStep()

  useEffect(() => {
    console.log(step)
  }, [step])

  return (
    <>
      <InputName />
      <InputEmail />
      <InputGroupPhone />
      <InputGroupDoc />
      <InputGroupBirth />
      <InputGroupParent />
      <InputCivilStatus />
      <InputProfession />
      <InputZip />
      <InputGroupAddress />
      <InputGroupGraduation />
      <InputCourse />
      <InputGroupPayment />
      <Resume />
    </>
  )
}

export default Form
