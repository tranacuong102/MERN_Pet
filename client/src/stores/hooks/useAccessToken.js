import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useLocalStorage } from './useLocalStorage'
import { accessTokenState } from '../recoil/atoms/accessTokenState'
import { LOCAL_STORAGE } from '../../utils/Constants'

const initialState = null
const KEY = LOCAL_STORAGE.ACCESS_TOKEN

export const useAccessToken = () => {
    const [local, setLocal] = useLocalStorage(KEY, initialState)
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

    useEffect(() => {
        if (
            (local && !accessToken) ||
            JSON.stringify(local) !== JSON.stringify(accessToken)
        ) {
            setAccessToken(local)
        }
    }, [local, setAccessToken, accessToken])

    useEffect(() => {
        if (
            accessToken &&
            JSON.stringify(JSON.parse(window.localStorage.getItem(KEY))) !==
                JSON.stringify(accessToken)
        ) {
            setLocal(accessToken)
        }
    }, [accessToken, setLocal])

    const removeAccessToken = async () => {
        await localStorage.removeItem(KEY)
        await setAccessToken(null)
    }

    return {
        accessToken,
        setAccessToken,
        removeAccessToken,
    }
}
