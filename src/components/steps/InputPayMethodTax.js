import { useRef, useEffect } from 'react'

import { currentStepIs, useSharedStep } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputPayMethodTax = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputRef = useRef(null)

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    controlInputValue({ name: 'payMethodTax', value: 'creditCard' })

    if (inputRef.current) {
      inputRef.current.value = values[inputRef.current.name]
    }
  }, [])

  return (
    currentStepIs('InputPayMethodTax', step) && (
      <>
        <div>
          <h1>Melhor forma para pagar a matricula</h1>
          <h3>
            Pagando a matricula você receberá acesso a:
            <ul>
              <li>
                <mark>Portal Do Aluno</mark>
              </li>
              <li>
                <mark>2 Materiais Didáticos</mark>
              </li>
              <li>
                <mark>2 Avaliações</mark>
              </li>
            </ul>
          </h3>
        </div>
        <div>
          <label htmlFor="creditCard">
            <input
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              defaultChecked={
                !values.payMethodTax || values.payMethodTax === 'creditCard'
              }
              id="creditCard"
              type="radio"
              name="payMethodTax"
              value="creditCard"
            />
            Cartão de crédito
          </label>
          <label htmlFor="billet">
            <input
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              defaultChecked={values.payMethodTax === 'billet'}
              id="billet"
              type="radio"
              name="payMethodTax"
              value="billet"
            />
            Boleto bancário
          </label>
        </div>
        <div>
          <button
            className="prev"
            onClick={() =>
              setNextStep({
                currentStep: 'InputChargeValueCourse',
                progressValue: step.progressValue - 7.69,
                values,
              })
            }
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() =>
              setNextStep({
                currentStep: 'InputChargeValueTax',
                progressValue: step.progressValue + 7.69,
                values,
              })
            }
          >
            Do meu jeito
          </button>
        </div>

        <style jsx>{`
          div:nth-child(2) {
            flex-direction: column;
          }
          div:nth-child(2) label input {
            margin-right: 10px;
            width: 30px;
            height: 30px;
          }
          label {
            display: flex;
            flex-wrap: nowrap;
            height: 60px;
            align-items: center;
            font-size: 1.8rem;
          }
          mark {
            padding: 0 10px;
          }
          ul {
            padding: 0;
            list-style: none;
          }
          ul li {
            margin: 15px 0;
          }
        `}</style>
      </>
    )
  )
}

export default InputPayMethodTax
