import { SharedStepProvider } from '../hooks/useSharedStep'
import Form from '../components/enrolment/Form'

const Enrolment = () => (
  <>
    <SharedStepProvider>
      <Form />
    </SharedStepProvider>
  </>
)

export default Enrolment
