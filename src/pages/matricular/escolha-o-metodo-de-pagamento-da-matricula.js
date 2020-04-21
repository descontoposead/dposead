import { useState, useEffect } from 'react'
import { useSessionStorage } from 'react-use'

import withStepLayout from '../../components/StepLayout'

const Step = () => {
  const [stepPage] = useState({
    prev: '/matricular/como-eu-vou-pagar-o-curso',
    next: '/matricular/como-eu-vou-pagar-a-matricula',
  })
  const [values, setValues] = useSessionStorage('values', {})

  const mergeInputValue = (target) =>
    setValues(Object.assign(values, { [target.name]: target.value }))

  useEffect(function onLoadSetDefaultPayMethod() {
    mergeInputValue({ name: 'payMethodTax', value: 'creditCard' })
  }, [])

  return (
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
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
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
            onChange={({ currentTarget }) => mergeInputValue(currentTarget)}
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
}

export default withStepLayout(Step, { progressValue: 90 })
