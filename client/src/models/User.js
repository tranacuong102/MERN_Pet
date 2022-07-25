import { LOCAL_STORAGE } from '../utils/Constants'

export function getAccessToken() {
    try {
        const accessToken = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
        )
        return accessToken
    } catch (error) {
        return null
    }
}

export function getCurrentUser() {
    try {
        const userInfo = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE.AUTH_INFO)
        )
        return userInfo
    } catch (error) {
        return null
    }
}

export function getCartCurrentUser() {
    try {
        const userInfoCart = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE.CART_INFO)
        )
        return userInfoCart
    } catch (error) {
        return null
    }
}
