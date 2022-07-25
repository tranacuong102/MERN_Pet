import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useLocalStorage } from './useLocalStorage'
import { authState } from '../recoil/atoms/authState'
import { LOCAL_STORAGE } from '../../utils/Constants'

const initialState = null
const KEY = LOCAL_STORAGE.AUTH_INFO

export const useAuthInfo = () => {
    // eslint-disable-next-line no-unused-vars
    const [local, setLocal] = useLocalStorage(KEY, initialState)
    const [authInfo, setAuth] = useRecoilState(authState)

    useEffect(() => {
        if (!local) {
            setAuth(null)
        } else if (
            (local && !authInfo) ||
            JSON.stringify(local) !== JSON.stringify(authInfo)
        ) {
            setAuth(local)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [local])

    const removeAuthInfo = async () => {
        await localStorage.removeItem(KEY)
        await setAuth(null)
    }

    const setAuthInfo = async (data) => {
        await localStorage.setItem(KEY, JSON.stringify(data))
        await setAuth(JSON.stringify(data))
    }

    return {
        authInfo,
        setAuthInfo,
        removeAuthInfo,
    }
}
