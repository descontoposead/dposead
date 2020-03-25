import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputPaymentValues = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()

  const assignNewValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputPaymentValues', step) && (
      <>
        <div>
          {values.paymentMethod === 'creditCard' ? (
            <h1>Adeque ao seu bolso</h1>
          ) : (
            <h1>A vista com</h1>
          )}
        </div>
        <section>
          <strong>
            O <mark>Curso</mark> por
          </strong>
          {values.paymentMethod === 'creditCard' ? (
            <>
              <button>&#10092;</button>
              <strong>
                1 x de 2.000 <i>reais</i>
              </strong>
              <button>&#10093;</button>
            </>
          ) : (
            <>
              <strong>
                2.000 <i>reais</i>
              </strong>
            </>
          )}
        </section>
        <section>
          <strong>
            A <mark>Matricula</mark> por
          </strong>
          <strong>
            200 <i>reais</i>
          </strong>
        </section>
        <div>
          <button
            className="prev"
            onClick={() => setNextStep({ currentStep: 'InputPaymentMethod' })}
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => setNextStep({ currentStep: 'Resume' })}
          >
            Assim está bom
          </button>
        </div>

        <style jsx>{`
          section {
            width: 215px;
            display: flex;
            flex-direction: column;
            font-size: 2rem;
            align-items: baseline;
          }
          section button {
            transform: rotate(90deg);
            padding: 2px;
            font-size: 1.2rem;
            border: 0;
            background: #ffffff;
            color: #292929;
            font-weight: bold;
            cursor: pointer;
            border: 4px solid;
            margin-left: 6px;
          }
          i {
            font-size 1.5rem
          }
          mark {
            padding: 0 10px
          }
          strong {
            font-size: 1.8rem;
          }
        `}</style>
      </>
    )
  )
}

export default InputPaymentValues
