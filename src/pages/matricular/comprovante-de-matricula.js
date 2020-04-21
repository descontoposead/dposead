import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSessionStorage } from 'react-use'

import withStepLayout from '../../components/StepLayout'

const Step = () => {
  const [stepPage] = useState({
    prev: '/matricular/como-eu-vou-pagar-a-matricula',
    next: '/matricular/efetuar-pagamento',
  })
  const [formatedAddress, setFormatedAddress] = useState('')

  const [values] = useSessionStorage('values', {})

  useEffect(function onLoadPageSetFormatedAddress() {
    if (!values.address) return
    if (!Object.keys(values.address).length) return

    setFormatedAddress(
      Object.keys(values.address)
        .map((prop) => values.address[prop])
        .join(', ')
    )
  }, [])

  const postMatriculate = () =>
    fetch('/api/matriculate', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student: {
          email: values.email,
        },
        product: {
          course: values.courseName,
          charges: [
            {
              name: 'courseValue',
              description: 'Cobrança do valor total do curso',
              payMethod: values.payMethodCourse,
              installments: values.chargeValueCourse.instalment,
              value: values.chargeValueCourse.value,
              currency: values.chargeValueCourse.currency,
              voucher: values?.voucher,
            },
            {
              name: 'courseTax',
              description: 'Cobrança do valor da matricula',
              payMethod: values.payMethodTax,
              installments: values.chargeValueTax.instalment,
              value: values.chargeValueTax.value,
              currency: values.chargeValueTax.currency,
            },
          ],
        },
      }),
    })

  return (
    <>
      <Head>
        <link rel="prefetch" href={stepPage.next}></link>
      </Head>
      <div>
        <h1>Confira sua inscrição</h1>
      </div>
      <div>
        <p>
          <label htmlFor="name">Aluno</label>
          <span>{values.name}</span>
        </p>
        <p>
          <label htmlFor="email">E-Mail</label>
          <span>{values.email}</span>
        </p>
        <p>
          <label htmlFor="phone">Telefone</label>
          <span>{values.phone}</span>
        </p>
        <p>
          <label htmlFor="whatsapp">Whatsapp</label>
          <span>{values.whatsapp}</span>
        </p>
        <p>
          <label htmlFor="personalDocument">CPF</label>
          <span>{values.personalDocument}</span>
        </p>
        <p>
          <label htmlFor="personalRegistry">RG</label>
          <span>{values.personalRegistry}</span>
        </p>
        <p>
          <label htmlFor="stateOfBirth">Estado que nasceu</label>
          <span>{values.stateOfBirth}</span>
        </p>
        <p>
          <label htmlFor="cityOfBirth">Cidade que nasceu</label>
          <span>{values.cityOfBirth}</span>
        </p>
        <p>
          <label htmlFor="dateOfBirth">Data de Nascimento</label>
          <span>{values.dateOfBirth}</span>
        </p>
        <p>
          <label htmlFor="parentName">Nome do pai</label>
          <span>{values.parentName}</span>
        </p>
        <p>
          <label htmlFor="motherName">Nome da mãe</label>
          <span>{values.motherName}</span>
        </p>
        <p>
          <label htmlFor="address">Endereço</label>
          <span>{formatedAddress}</span>
        </p>
        <p>
          <label htmlFor="motherName">Graduação</label>
          <span>{values.graduation}</span>
        </p>
        <p>
          <label htmlFor="motherName">Data de colação de grau</label>
          <span>{values.dateOfGraduation}</span>
        </p>
        <p>
          <label htmlFor="motherName">Curso escolhido</label>
          <mark>{values.courseName}</mark>
        </p>
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
          onClick={async () => {
            Array.from(
              document.querySelectorAll('button.next, button.prev')
            ).map((b) => b.setAttribute('disabled', 'disabled'))
            sessionStorage.setItem('values', JSON.stringify(values))
            postMatriculate()
            window.location.assign(stepPage.next)
          }}
        >
          Finalizar!
        </button>
      </div>
      <style jsx>{`
        @media (max-width: 450px) {
          div:nth-child(3) {
            justify-content: stretch;
          }
        }
        div:nth-child(1) {
          padding: 0;
          position: sticky;
          top: 0px;
        }
        div:nth-child(1) > h1 {
          width: 100%;
          flex: 1;
          background: rgba(0, 0, 0, 0.9);
          text-align: center;
          color: #fff;
          margin-top: 0px;
          padding: 10px 5px;
          font-size: 1.8rem;
          box-sizing: border-box;
        }
        div:nth-child(2) {
          display: flex;
          flex-wrap: wrap;
          height: 75vh;
          overflow-y: scroll;
          justify-content: center;
          align-content: end;
          margin: 0;
        }
        div:nth-child(3) {
          width: 100vw;
          margin-top: 19px;
          position: sticky;
          top: 0px;
          bottom: 0px;
          z-index: 1;
        }
        div:nth-child(3) button {
          margin-bottom: 10px;
        }
        div:nth-child(2) > p {
          font-size: 1.3rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: 5px 10px;
          border-bottom: 3px solid;
        }
        div:nth-child(2) > p > label {
          font-weight: bold;
          margin-right: 20px;
          text-align: left;
        }
        div:nth-child(2) > p > span {
          text-align: right;
        }
        div:nth-child(2) > p > mark {
          padding: 0 5px;
          font-weight: bold;
          text-align: right;
        }
      `}</style>
    </>
  )
}

export default withStepLayout(Step, { progressValue: 100 })
