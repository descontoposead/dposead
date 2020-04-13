import { useSharedStep, currentStepIs } from '../../hooks/useSharedStep'
import { useEffect } from 'react'

const Resume = () => {
  const [step, setNextStep] = useSharedStep()

  useEffect(() => {
    if (currentStepIs('Resume', step)) {
      fetch('/api/students', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student: {
            email: step.values.email,
            name: step.values.name,
            phone: step.values.phone,
            whatsapp: step.values.whatsapp,
            personalDocument: step.values.personalDocument,
            personalRegistry: step.values.personalRegistry,
            stateOfBirth: step.values.stateOfBirth,
            cityOfBirth: step.values.cityOfBirth,
            dateOfBirth: step.values.dateOfBirth,
            parentName: step.values.parentName,
            motherName: step.values.motherName,
            zipcode: step.values.zipcode,
            graduation: step.values.graduation,
            dateOfGraduation: step.values.dateOfGraduation,
            address: step.values.address,
          },
          enrollment: {
            course: step.values.courseName,
            charges: [
              {
                name: 'courseValue',
                description: 'Cobrança do valor total do curso',
                payMethod: step.values.payMethodCourse,
                installments: step.values.chargeValueCourse.instalment,
                value: step.values.chargeValueCourse.value,
                currency: step.values.chargeValueCourse.currency,
              },
              {
                name: 'courseTax',
                description: 'Cobrança do valor da matricula',
                payMethod: step.values.payMethodTax,
                installments: step.values.chargeValueTax.instalment,
                value: step.values.chargeValueTax.value,
                currency: step.values.chargeValueTax.currency,
              },
            ],
          },
        }),
      })
    }
  }, [step])

  return (
    currentStepIs('Resume', step) && (
      <>
        <div>
          <h1>Confira sua inscrição</h1>
        </div>
        <div>
          <p>
            <label htmlFor="name">Aluno</label>
            <span>{step.values.name}</span>
          </p>
          <p>
            <label htmlFor="email">E-Mail</label>
            <span>{step.values.email}</span>
          </p>
          <p>
            <label htmlFor="phone">Telefone</label>
            <span>{step.values.phone}</span>
          </p>
          <p>
            <label htmlFor="whatsapp">Whatsapp</label>
            <span>{step.values.whatsapp}</span>
          </p>
          <p>
            <label htmlFor="personalDocument">CPF</label>
            <span>{step.values.personalDocument}</span>
          </p>
          <p>
            <label htmlFor="personalRegistry">RG</label>
            <span>{step.values.personalRegistry}</span>
          </p>
          <p>
            <label htmlFor="stateOfBirth">Estado que nasceu</label>
            <span>{step.values.stateOfBirth}</span>
          </p>
          <p>
            <label htmlFor="cityOfBirth">Cidade que nasceu</label>
            <span>{step.values.cityOfBirth}</span>
          </p>
          <p>
            <label htmlFor="dateOfBirth">Data de Nascimento</label>
            <span>{step.values.dateOfBirth}</span>
          </p>
          <p>
            <label htmlFor="parentName">Nome do pai</label>
            <span>{step.values.parentName}</span>
          </p>
          <p>
            <label htmlFor="motherName">Nome da mãe</label>
            <span>{step.values.motherName}</span>
          </p>
          <p>
            <label htmlFor="motherName">Endereço</label>
            <span>
              {Object.keys(step.values.address)
                .map((prop) => step.values.address[prop])
                .join(', ')}
            </span>
          </p>
          <p>
            <label htmlFor="motherName">Graduação</label>
            <span>{step.values.graduation}</span>
          </p>
          <p>
            <label htmlFor="motherName">Data de colação de grau</label>
            <span>{step.values.dateOfGraduation}</span>
          </p>
          <p>
            <label htmlFor="motherName">Curso escolhido</label>
            <mark>{step.values.courseName}</mark>
          </p>
        </div>
        <div>
          <button
            className="prev"
            onClick={() =>
              setNextStep({
                currentStep: 'InputChargeValueTax',
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
                currentStep: 'FinalStep',
                progressValue: step.progressValue + 7.69,
                values: step.values,
              })
            }
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
  )
}

export default Resume
