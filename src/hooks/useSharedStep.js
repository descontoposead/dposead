import { createStateContext } from 'react-use'

const [useSharedStep, SharedStepProvider] = createStateContext({
  currentStep: 'InputLead',
  progressValue: 1,
  values: {},
})

const currentStepIs = (step, { currentStep }) => step === currentStep

export { useSharedStep, SharedStepProvider, currentStepIs }
