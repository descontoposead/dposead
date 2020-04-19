import { useState, useEffect, useRef } from 'react'
import { useDebounce, useLocation } from 'react-use'

import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useSharedValues } from '../../hooks/useSharedValues'

const InputChargeValueCourse = () => {
  const [step, setNextStep] = useSharedStep()
  const [values, setSharedValues] = useSharedValues()
  const [chargeValueCourse, setChargeValueCourse] = useState(null)
  const [chargeInitialValueCourse, setChargeInitialValueCourse] = useState({
    instalment: 1,
    value: 180000,
    currency: 1800,
  })
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
  const [isFetching, setFetching] = useState(false)
  const [hasError, setError] = useState(null)
  const [voucher, setVoucher] = useState(null)
  const refVoucherInput = useRef(null)

  useDebounce(
    () => {
      fetch(`/api/vouchers?q=${typedVoucher}`)
        .then((res) => res.json())
        .then((res) => {
          setError(false)
          setFetching(false)
          setVoucher(res)
          controlInputValue({
            name: refVoucherInput.current.name,
            value: res.pretty,
          })
          setChargeValueCourse({
            instalment: 1,
            value: chargeInitialValueCourse.value - res.value,
            currency: chargeInitialValueCourse.currency - res.currency,
          })
        })
        .catch((err) => {
          setFetching(false)
          setVoucher(false)
          setError(err)
          controlInputValue({
            name: 'voucher',
            value: '',
          })
          setChargeValueCourse(chargeInitialValueCourse)
        })
    },
    1000,
    [typedVoucher]
  )

  useEffect(() => {
    controlInputValue({
      name: 'chargeValueCourse',
      value: chargeInitialValueCourse,
    })
  }, []) //oninit

  useEffect(() => {
    if (currentStepIs('InputChargeValueCourse', step)) {
      //reset
      const initialChargeCourseValue = chargeInitialValueCourse
      setChargeValueCourse(initialChargeCourseValue)
      controlInputValue({
        name: 'chargeValueCourse',
        value: initialChargeCourseValue,
      })
    }

    if (refVoucherInput.current) {
      const { current } = refVoucherInput
      current.value = values[current.name] || ''
    }
  }, [step]) //onstepchange

  useEffect(
    function setVoucherOnInQueryUrl() {
      if (refVoucherInput.current) {
        const searchVoucher = window.location.search.split('=').pop()
        if (searchVoucher) {
          setVoucherOnType(searchVoucher)
          refVoucherInput.current.value = searchVoucher
        }
      }
    },
    [refVoucherInput.current]
  )

  useEffect(() => {
    if (values.courseName === 'ENGENHARIA DE SEGURANÇA DO TRABALHO') {
      setChargeInitialValueCourse({
        instalment: 1,
        value: 400000,
        currency: 4000,
      })
    } else {
      setChargeInitialValueCourse({
        instalment: 1,
        value: 180000,
        currency: 1800,
      })
    }
  }, [values?.courseName])

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

  const setVoucherOnType = (value) => {
    setVoucher(false)
    setError(false)
    setFetching(true)
    setTypedVoucher(value)
  }

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
            {!voucher && (
              <strong>
                {chargeValueCourse?.instalment} x de{' '}
                <i>R$ {chargeValueCourse?.currency.toFixed(2)}</i>
              </strong>
            )}
            {voucher && (
              <>
                <strong className="striked">
                  De {chargeInitialValueCourse?.instalment} x de{' '}
                  <i>R$ {chargeInitialValueCourse?.currency.toFixed(2)}</i>
                </strong>
                <strong>
                  Por {chargeValueCourse?.instalment} x de{' '}
                  <i>R$ {chargeValueCourse?.currency.toFixed(2)}</i>
                </strong>
              </>
            )}
            <button onClick={(e) => decrementInstalment(e)}>&#10093;</button>
          </section>
          <div className="voucher-choicer">
            {values.voucher && (
              <label htmlFor="voucher">Usando o Voucher</label>
            )}
            <input
              ref={refVoucherInput}
              onChange={({ target }) => setVoucherOnType(target.value)}
              autoComplete="off"
              autoFocus
              type="text"
              placeholder="Voucher de Desconto"
              name="voucher"
            />
            {isFetching && !hasError && 'Buscando seu voucher...'}
            {hasError && !voucher && 'Esse voucher existe?'}
            {voucher && voucher.description}
          </div>
        </div>
        <div>
          <button
            className="prev"
            onClick={() =>
              setNextStep({
                currentStep: 'InputPayMethodCourse',
                progressValue: step.progressValue - 7.69,
                values,
              })
            }
          >
            Voltar
          </button>
          <button
            className="next"
            onClick={() => {
              fbq('trackSingleCustom', '2534781333293766', 'BuyIntention', {
                content_name: `${values.courseName}, ${values.payMethodCourse}, ${chargeValueCourse.currency}`,
              })

              setNextStep({
                currentStep: 'InputPayMethodTax',
                progressValue: step.progressValue + 7.69,
                values,
              })
            }}
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
          div.voucher-choicer {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          strong.striked {
            text-decoration: line-through;
            color: #666;
            font-weight: 100;
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
