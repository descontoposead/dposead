import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputChargeValueCourse = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const [chargeValueCourse, setChargeValueCourse] = useState(null)
  const [instalmentPlan] = useState({
    creditCard: {
      max: 12,
      min: 1,
    },
    billet: {
      max: 18,
      min: 1,
    },
  })
  const [typedVoucher, setTypedVoucher] = useState('')

  useDebounce(
    () => {
      console.log(typedVoucher)
    },
    1000,
    [typedVoucher]
  )

  useEffect(() => {
    controlInputValue({
      name: 'chargeValueCourse',
      value: {
        instalment: 1,
        value: 200000,
        currency: 2000,
      },
    })
  }, []) //oninit

  useEffect(() => {
    if (currentStepIs('InputChargeValueCourse', step)) {
      //reset
      const initialChargeCourseValue = {
        instalment: 1,
        value: 200000,
        currency: 2000,
      }
      setChargeValueCourse(initialChargeCourseValue)
      controlInputValue({
        name: 'chargeValueCourse',
        value: initialChargeCourseValue,
      })
    }
  }, [step]) //onstepchange

  const incrementInstalment = (e) => {
    e.preventDefault()

    if (
      chargeValueCourse.instalment < instalmentPlan[values.payMethodCourse].max
    ) {
      setChargeValueCourse({
        instalment: ++chargeValueCourse.instalment,
        value: chargeValueCourse.value,
        currency: chargeValueCourse.value / 100 / chargeValueCourse.instalment,
      })
      controlInputValue({ name: 'chargeValueCourse', value: chargeValueCourse })
    }
  }

  const decrementInstalment = (e) => {
    e.preventDefault()

    if (
      chargeValueCourse.instalment > instalmentPlan[values.payMethodCourse].min
    ) {
      setChargeValueCourse({
        instalment: --chargeValueCourse.instalment,
        value: chargeValueCourse.value,
        currency: chargeValueCourse.value / 100 / chargeValueCourse.instalment,
      })
      controlInputValue({ name: 'chargeValueCourse', value: chargeValueCourse })
    }
  }

  const controlInputValue = (target) =>
    setSharedValues(Object.assign(values, { [target.name]: target.value }))

  return (
    currentStepIs('InputChargeValueCourse', step) && (
      <>
        <div>
          <h1>Como você deseja investir o curso?</h1>
        </div>
        <div>
          <section>
            <strong>
              <mark>{values.courseName}</mark> por
            </strong>
            <button onClick={(e) => incrementInstalment(e)}>&#10092;</button>
            <strong>
              {chargeValueCourse?.instalment} x de{' '}
              <i>{chargeValueCourse?.currency.toFixed(2)} reais</i>
            </strong>
            <button onClick={(e) => decrementInstalment(e)}>&#10093;</button>
          </section>
          <div>
            {values.voucher && (
              <label htmlFor="voucher">Voucher de Desconto</label>
            )}
            <input
              onChange={({ target }) => setTypedVoucher(target.value)}
              autoComplete="off"
              autoFocus
              type="text"
              placeholder="Voucher de Desconto"
              name="voucher"
            />
            <strong className="hasInvalidError">
              Precisa ser um voucher válido!
            </strong>
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() =>
              setNextStep({
                currentStep: 'InputPayMethodCourse',
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
                currentStep: 'InputPayMethodTax',
                progressValue: step.progressValue + 7.69,
              })
            }
          >
            Assim está bom
          </button>
        </div>

        <style jsx>{`
          @media (min-width: 451px) {
            section {
              width: auto
            }
          }
          @media (max-width: 450px) {
            section {
              width: 250px
            }
          }
          div:nth-child(2) > div > input {
            border-bottom: 4px solid #000000;
          }
          section {
            display: flex;
            flex-direction: column;
            font-size: 2rem;
            align-items: baseline;
            text-align: left;
            margin-bottom: 40px
          }
          section > strong {
            text-align: left;
            line-height: 1.8;
          }
          section:last-child {
            margin-bottom: 0;
          }
          section button {
            transform: rotate(90deg);
            padding: 5px;
            font-size: 1.5rem;
            border: 0;
            background: #ffffff;
            color: #292929;
            font-weight: bold;
            cursor: pointer;
            border: 4px solid;
            margin-left: 6px;
          }
          section > strong:first-child {
            margin-bottom: 10px;
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

export default InputChargeValueCourse
