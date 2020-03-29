import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'

const FinalStep = () => {
  const [step] = useSharedStep()

  return (
    currentStepIs('FinalStep', step) && (
      <>
        <div>
          <h1>Matricula realizada com sucesso.</h1>
          <h2>
            Entraremos em contato para entregar o acesso ao Portal do aluno.
          </h2>
        </div>
      </>
    )
  )
}

export default FinalStep
