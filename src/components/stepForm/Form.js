import { useEffect } from 'react'

import { useSharedStep } from '../../hooks/useSharedStep'
import { SharedValuesProvider } from '../../hooks/useSharedValues'
import InputName from './InputName'
import InputEmail from './InputEmail'
import InputGroupPhone from './InputGroupPhone'
import InputGroupDoc from './InputGroupDoc'
import InputGroupBirth from './InputGroupBirth'
import InputGroupParent from './InputGroupParent'
import InputCivilStatus from './InputCivilStatus'
import InputProfession from './InputProfession'
import InputZip from './InputZip'
import InputFullAddress from './InputFullAddress'
import InputGroupGraduation from './InputGroupGraduation'
import InputCourse from './InputCourse'
import InputPaymentValues from './InputPaymentValues'
import InputPaymentMethod from './InputPaymentMethod'
import Resume from './Resume'
import FinalStep from './FinalStep'

const Form = () => {
  const [step] = useSharedStep()

  useEffect(() => {
    console.log('Formlário completo:')
    console.log(step)
  }, [step])

  return (
    <form>
      <SharedValuesProvider>
        <InputName />
        <InputEmail />
        <InputGroupPhone />
        <InputGroupDoc />
        <InputGroupBirth />
        <InputGroupParent />
        <InputCivilStatus />
        <InputProfession />
        <InputZip />
        <InputFullAddress />
        <InputGroupGraduation />
        <InputCourse />
        <InputPaymentValues />
        <InputPaymentMethod />
        <Resume />
        <FinalStep />
      </SharedValuesProvider>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Baloo+2&display=swap');

        @media (min-width: 449px) {
          form {
            justify-content: space-around;
          }
        }
        @media (max-width: 450px) {
          form {
            justify-content: space-between;
            padding: 0 0 20px;
            box-sizing: border-box;
          }
        }

        strong.hasError {
          display: none;
        }
        .error + strong.hasError {
          display: block;
          color: #f44336;
        }
        .error {
          border-bottom: 4px solid #f44336 !important;
        }
        body {
          margin: 0;
        }
        :root {
          margin: 0;
          touch-action: pan-y;
          font-family: 'Baloo 2', cursive;
        }
        form {
          width: 100vw;
          display: flex;
          flex-wrap: wrap;
        }
        form > div {
          width: 100vw;
          text-align: center;
          padding: 0 16px;
          box-sizing: border-box;
        }
        form > div:nth-child(1),
        form > div:nth-child(2) {
          align-self: flex-start;
        }
        form > div:nth-child(3) {
          display: flex;
          justify-content: center;
          align-items: stretch;
        }
        form > div:nth-child(2) > div {
          margin-bottom: 15px;
        }
        form > div:nth-child(2) > div:last-child {
          margin-bottom: 0;
        }
        form > div:nth-child(2) {
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          justify-content: center;
          margin-bottom: 30px;
        }
        form > div:nth-child(2) input:first-child {
          margin-bottom: 5px;
        }
        textarea:focus,
        input:focus {
          outline: none;
        }
        form > div:nth-child(2) textarea {
          resize: none;
        }
        form > div:nth-child(2) textarea,
        form > div:nth-child(2) input {
          width: 90vw;
          border: 0;
          font-size: 1.8rem;
          text-align: center;
          overflow: hidden;
        }
        form > div:nth-child(2) strong {
          width: 100%;
          font-size: 1.5rem;
        }
        form > div h1 {
          color: #292929;
          font-size: 2.5rem;
          line-height: 1.25;
        }
        form > div button {
          font-size: 1.5rem;
          border: solid 4px;
          padding: 10px 15px;
          border-radius: 10px;
          font-weight: bold;
          background: transparent;
        }
        form > div button.prev {
          border-color: #6b6b6b;
          color: #6b6b6b;
          margin-right: 5px;
        }
        form > div button.next {
          border-color: #292929;
          color: #292929;
        }
      `}</style>
    </form>
  )
}

export default Form
