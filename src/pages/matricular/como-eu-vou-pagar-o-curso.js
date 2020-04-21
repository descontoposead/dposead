import { useRef, useEffect, useState } from 'react'
import { useSessionStorage, useDebounce } from 'react-use'

import withStepLayout from '../../components/StepLayout'

const Step = () => {
  const [stepPage] = useState({
    prev: '/matricular/escolha-o-metodo-de-pagamento-do-curso',
    next: '/matricular/escolha-o-metodo-de-pagamento-da-matricula',
  })
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

  const [values, setValues] = useSessionStorage('values', {})

  const mergeInputValue = (target) =>
    setValues(Object.assign(values, { [target.name]: target.value }))

  const fetchVoucher = (voucher = '') =>
    fetch(`/api/vouchers?q=${voucher || typedVoucher}`)
      .then((res) => res.json())
      .then((res) => {
        setError(false)
        setFetching(false)
        setVoucher(res)
        mergeInputValue({
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
        mergeInputValue({
          name: 'voucher',
          value: '',
        })
        setChargeValueCourse(chargeInitialValueCourse)
      })

  useDebounce(
    function queryVoucherOnInputTypeAfter1s() {
      if (!typedVoucher) return
      fetchVoucher()
    },
    1000,
    [typedVoucher]
  )

  useEffect(function onLoadPageSetInitialChargeValue() {
    mergeInputValue({
      name: 'chargeValueCourse',
      value: chargeInitialValueCourse,
    })
  }, [])

  useEffect(function onLoadPageResetValuesOfCharge() {
    const initialChargeCourseValue = chargeInitialValueCourse
    setChargeValueCourse(initialChargeCourseValue)
    mergeInputValue({
      name: 'chargeValueCourse',
      value: initialChargeCourseValue,
    })
  }, [])

  useEffect(
    function onLoadPageAndHaveVoucherFetchValue() {
      if (values.voucher) {
        fetchVoucher(values.voucher)
      }
    },
    [values.voucher]
  )

  useEffect(
    function setVoucherWhenQueryByUrl() {
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

  useEffect(
    function setCustomValueToAnUniqueCourse() {
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
    },
    [values?.courseName]
  )

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
      mergeInputValue({ name: 'chargeValueCourse', value: chargeValueCourse })
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
      mergeInputValue({ name: 'chargeValueCourse', value: chargeValueCourse })
    }
  }

  const setVoucherOnType = (value) => {
    setVoucher(false)
    setError(false)
    setFetching(true)
    setTypedVoucher(value)
  }

  return (
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
          {values.voucher && <label htmlFor="voucher">Usando o Voucher</label>}
          <input
            ref={refVoucherInput}
            onChange={({ target }) => setVoucherOnType(target.value)}
            defaultValue={values.voucher}
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
          onClick={() => window.location.assign(stepPage.prev)}
        >
          Voltar
        </button>
        <button
          className="next"
          onClick={() => {
            sessionStorage.setItem('values', JSON.stringify(values))
            window.location.assign(stepPage.next)
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
}

export default withStepLayout(Step, { progressValue: 82.5 })
