import { createStateContext } from 'react-use'

const [useSharedValues, SharedValuesProvider] = createStateContext({})

export { useSharedValues, SharedValuesProvider }
