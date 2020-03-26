import { useState, useEffect } from 'react'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputPaymentValues = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const [inputCourse, setInputCourse] = useState()
  const [inputTax, setInputTax] = useState()

  useEffect(() => {
    setInputCourse({ parcels: 1, value: 2000, parceled: 0 })
    setInputTax({ parcels: 1, value: 200 })

    assignNewValue({ name: 'course', value: inputCourse })
    assignNewValue({ name: 'tax', value: inputTax })
  }, [])

  const incrementParcels = (e) => {
    e.preventDefault()
    const limitIncrement = 3
    if (inputCourse.parcels < limitIncrement) {
      setInputCourse({
        parcels: ++inputCourse.parcels,
        parceled: inputCourse.value / inputCourse.parcels,
        value: inputCourse.value,
      })
      assignNewValue({ name: 'course', value: inputCourse })
    }
  }

  const decrementParcels = (e) => {
    e.preventDefault()
    const limitDecrement = 1
    if (inputCourse.parcels > limitDecrement) {
      setInputCourse({
        parcels: --inputCourse.parcels,
        parceled: inputCourse.value / inputCourse.parcels,
        value: inputCourse.value,
      })
      assignNewValue({ name: 'course', value: inputCourse })
    }
  }

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
              <button onClick={(e) => incrementParcels(e)}>&#10092;</button>
              <strong>
                {inputCourse.parcels} x de{' '}
                <i>
                  {(inputCourse.parceled || inputCourse.value).toFixed(2)} reais
                </i>
              </strong>
              <button onClick={(e) => decrementParcels(e)}>&#10093;</button>
            </>
          ) : (
            <>
              <strong>
                <i>{inputCourse.value.toFixed(2)} reais</i>
              </strong>
            </>
          )}
        </section>
        <section>
          <strong>
            A <mark>Matricula</mark> por
          </strong>
          <strong>
            {inputTax.value} <i>reais</i>
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
