import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const Resume = () => {
  const [step] = useSharedStep()
  const [values] = useSharedValues()

  console.log(values)

  return (
    currentStepIs('Resume', step) && (
      <>
        <p>Fim</p>
        <button
          onClick={(e) => {
            e.preventDefault()
            console.log(values)
          }}
        ></button>
      </>
    )
  )
}

export default Resume
