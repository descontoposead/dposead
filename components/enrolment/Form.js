import { useEffect } from 'react'

import { useSharedStep } from '../../hooks/useSharedStep'
import InputName from './InputName'
import InputEmail from './InputEmail'
import InputGroupPhone from './InputGroupPhone'
import InputGroupDoc from './InputGroupDoc'
import InputGroupBirth from './InputGroupBirth'
import InputGroupParent from './InputGroupParent'
import InputCivilStatus from './InputCivilStatus'
import InputProfession from './InputProfession'
import InputZip from './InputZip'
import InputGroupAddress from './InputGroupAddress'
import InputGroupGraduation from './InputGroupGraduation'
import InputCourse from './InputCourse'
import InputGroupPayment from './InputGroupPayment'
import Resume from './Resume'

const Form = () => {
  const [step, _] = useSharedStep()

  useEffect(() => {
    console.log(step)
  }, [step])

  return (
    <form>
      <InputName />
      <InputEmail />
      <InputGroupPhone />
      <InputGroupDoc />
      <InputGroupBirth />
      <InputGroupParent />
      <InputCivilStatus />
      <InputProfession />
      <InputZip />
      <InputGroupAddress />
      <InputGroupGraduation />
      <InputCourse />
      <InputGroupPayment />
      <Resume />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Baloo+2&display=swap');

        :root {
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
          justify-content: space-evenly;
        }
        form > div {
          width: 100vw;
          text-align: center;
          padding: 0 16px;
          box-sizing: border-box;
        }
        form > div:nth-child(2) {
          height: 30vh;
          display: flex;
          flex-wrap: wrap;
          align-content: center;
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
        }
        form > div:nth-child(3) button {
          font-size: 1.5rem;
          border: solid 4px;
          padding: 10px 15px;
          border-radius: 10px;
          font-weight: bold;
          background: transparent;
          color: #292929;
        }
      `}</style>
    </form>
  )
}

export default Form
