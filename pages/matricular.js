import { useEffect, useState } from 'react'

import InputName from '../components/enrolment/InputName'
import InputEmail from '../components/enrolment/InputEmail'
import InputGroupPhone from '../components/enrolment/InputGroupPhone'
import InputGroupDoc from '../components/enrolment/InputGroupDoc'
import InputGroupBirth from '../components/enrolment/InputGroupBirth'
import InputGroupParent from '../components/enrolment/InputGroupParent'
import InputCivilStatus from '../components/enrolment/InputCivilStatus'
import InputProfession from '../components/enrolment/InputProfession'
import InputZip from '../components/enrolment/InputZip'
import InputGroupAddress from '../components/enrolment/InputGroupAddress'
import InputGroupGraduation from '../components/enrolment/InputGroupGraduation'
import InputCourse from '../components/enrolment/InputCourse'
import InputGroupPayment from '../components/enrolment/InputGroupPayment'
import Resume from '../components/enrolment/Resume'

const Enrolment = () => {
  const [step, setNextStep] = useState({ currentStep: 'InputName' })
  const stepView = (currentStep) => step.currentStep === currentStep

  useEffect(() => {
    console.log(step)
  }, [step])

  return (
    <>
      <InputName stepNext={setNextStep} stepView={stepView} />
      <InputEmail stepNext={setNextStep} stepView={stepView} />
      <InputGroupPhone stepNext={setNextStep} stepView={stepView} />
      <InputGroupDoc stepNext={setNextStep} stepView={stepView} />
      <InputGroupBirth stepNext={setNextStep} stepView={stepView} />
      <InputGroupParent stepNext={setNextStep} stepView={stepView} />
      <InputCivilStatus stepNext={setNextStep} stepView={stepView} />
      <InputProfession stepNext={setNextStep} stepView={stepView} />
      <InputZip stepNext={setNextStep} stepView={stepView} />
      <InputGroupAddress stepNext={setNextStep} stepView={stepView} />
      <InputGroupGraduation stepNext={setNextStep} stepView={stepView} />
      <InputCourse stepNext={setNextStep} stepView={stepView} />
      <InputGroupPayment stepNext={setNextStep} stepView={stepView} />
      <Resume stepNext={setNextStep} stepView={stepView} />
    </>
  )
}

export default Enrolment
