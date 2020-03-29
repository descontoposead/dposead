import { SharedStepProvider } from '../hooks/useSharedStep'
import Form from '../components/stepForm/Form'

const Enrolment = () => (
  <>
    <SharedStepProvider>
      <Form />
    </SharedStepProvider>

    <img id="logo" src="/static/images/logo-prominas.webp" alt="" />

    <style jsx>{`
      img#logo {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    `}</style>
  </>
)

export default Enrolment
