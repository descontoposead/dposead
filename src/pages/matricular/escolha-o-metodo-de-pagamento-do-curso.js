import { useState, useEffect } from 'react'
import { useSessionStorage } from 'react-use'

import withStepLayout from '../../components/StepLayout'

const Step = () => {
  const [stepPage] = useState({
    prev: '/matricular/escolha-um-novo-curso',
    next: '/matricular/como-eu-vou-pagar-o-curso',
  })
  const [values, setValues] = useSessionStorage('values', {})

  const mergeInputValue = (target) =>
    setValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(function onLoadSetDefaultPayMethod() {
    mergeInputValue({ name: 'payMethodCourse', value: 'creditCard' })
  }, [])

  return (
    <>
      <div>
        <h1>Melhor forma para investir no curso</h1>
      </div>
      <div>
        <label htmlFor="creditCard">
          <input
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
            defaultChecked={
              !values.payMethodCourse || values.payMethodCourse === 'creditCard'
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
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
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
}

export default withStepLayout(Step, { progressValue: 75 })
