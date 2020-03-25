import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const Resume = () => {
  const [step] = useSharedStep()
  const [values] = useSharedValues()

  return (
    currentStepIs('Resume', step) && (
      <>
        <p>Fim</p>
        <button onClick={() => console.log(values)}></button>
      </>
    )
  )
}

export default Resume
