import { useContext } from 'react'
import Context from './Context'

export const MyContexts = () => {
    const [state, dispatch] = useContext(Context)

    return [state, dispatch]
}
