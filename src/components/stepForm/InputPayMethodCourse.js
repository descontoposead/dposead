import { useRef, useEffect } from 'react'

import { currentStepIs, useSharedStep } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputPayMethodCourse = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const inputRef = useRef(null)

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(() => {
    controlInputValue({ name: 'payMethodCourse', value: 'creditCard' })

    if (inputRef.current) {
      inputRef.current.value = values[inputRef.current.name]
    }
  }, [])

  return (
    currentStepIs('InputPayMethodCourse', step) && (
      <>
        <div>
          <h1>Melhor forma para investir no curso</h1>
        </div>
        <div>
          <label htmlFor="creditCard">
            <input
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              defaultChecked={
                !values.payMethodCourse ||
                values.payMethodCourse === 'creditCard'
              }
              id="creditCard"
              type="radio"
              name="payMethodCourse"
              value="creditCard"
            />
            Cartão de crédito
          </label>
          <label htmlFor="billet">
            <input
              onChange={({ currentTarget }) => controlInputValue(currentTarget)}
              defaultChecked={values.payMethodCourse === 'billet'}
              id="billet"
              type="radio"
              name="payMethodCourse"
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
                currentStep: 'InputCourse',
                progressValue: step.progressValue - 7.69,
              })
            }
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() =>
              setNextStep({
                currentStep: 'InputChargeValueCourse',
                progressValue: step.progressValue + 7.69,
              })
            }
          >
            Assim está bom
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
        `}</style>
      </>
    )
  )
}

export default InputPayMethodCourse
