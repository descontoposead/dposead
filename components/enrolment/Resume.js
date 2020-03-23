import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const Resume = () => {
  const [step, _] = useSharedStep()

  return (
    currentStepIs('Resume', step) && (
      <>
        <p>Fim</p>
      </>
    )
  )
}

export default Resume
