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

const Form = () => {
  const [step] = useSharedStep()

  useEffect(() => {
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
      </SharedValuesProvider>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Baloo+2&display=swap');

        strong.hasError {
          opacity: 0;
        }
        .error + strong.hasError {
          opacity: 1;
          color: #f44336;
        }
        .error {
          border-bottom: 4px solid #f44336 !important;
        }

        :root {
          touch-action: none;
          overflow: hidden;
          font-family: 'Baloo 2', cursive;
        }
        form {
          width: 100vw;
          display: flex;
          flex-wrap: wrap;
          height: 100vh;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
        }
        form > div {
          width: 100vw;
          text-align: center;
          padding: 0 16px;
          box-sizing: border-box;
        }
        form > div:nth-child(2) {
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          justify-content: center;
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
          height: 100%;
        }
        form > div:nth-child(2) textarea,
        form > div:nth-child(2) input {
          width: 100vw;
          height: 100%;
          border: 0;
          font-size: 1.8rem;
          text-align: center;
          overflow: hidden;
        }
        form > div:nth-child(2) strong {
          flex: 1;
          margin-top: 20px;
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
          margin-bottom: 5px;
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
