import { useContext } from 'react'
import { StoreContext } from '../context'

function useStore() {
    const [state, dispatch] = useContext(StoreContext)

    return [state, dispatch]
}

export default useStore
