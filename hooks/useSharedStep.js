import { createStateContext } from 'react-use'

const [useSharedStep, SharedStepProvider] = createStateContext({
  currentStep: 'InputName',
})

const currentStepIs = (step, { currentStep }) => step === currentStep

export { useSharedStep, SharedStepProvider, currentStepIs }
