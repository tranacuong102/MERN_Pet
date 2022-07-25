import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useLocalStorage } from './useLocalStorage'
import { cartState } from '../recoil/atoms/cartState'
import { LOCAL_STORAGE } from '../../utils/Constants'

const initialState = null
const KEY = LOCAL_STORAGE.CART_INFO

export const useCartInfo = () => {
    // eslint-disable-next-line no-unused-vars
    const [local, setLocal] = useLocalStorage(KEY, initialState)
    const [cartInfo, setCart] = useRecoilState(cartState)

    useEffect(() => {
        if (!local) {
            setCart(null)
        } else if (
            (local && !cartInfo) ||
            JSON.stringify(local) !== JSON.stringify(cartInfo)
        ) {
            setCart(local)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [local])

    const removeCartInfo = async () => {
        await localStorage.removeItem(KEY)
        await setCart(null)
    }

    const setCartInfo = async (data) => {
        await localStorage.setItem(KEY, JSON.stringify(data))
        await setCart(JSON.stringify(data))
    }

    return {
        useCartInfo,
        setCartInfo,
        removeCartInfo,
    }
}
