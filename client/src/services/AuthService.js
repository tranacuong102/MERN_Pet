import BaseService from './BaseService'

const API_END_POINT = 'auth'

const AuthService = {
    register: (data = {}) => {
        return BaseService.post(`${API_END_POINT}/register`, data)
    },
    login: (data = {}) => {
        return BaseService.post(`${API_END_POINT}/login`, data)
    },
    getUser: () => {
        return BaseService.get(`${API_END_POINT}/profile`)
    },
    updateAvatar: (data = '') => {
        return BaseService.patch(`${API_END_POINT}/changeavatar`, data)
    },
    addCart: (data = []) => {
        return BaseService.patch(`${API_END_POINT}/addcart`, data)
    },
    buyProduct: (data = {}) => {
        return BaseService.patch(`${API_END_POINT}/buyone`, data)
    },
    buyCart: (data = {}) => {
        return BaseService.put(`${API_END_POINT}/buycart`, data)
    },
}

export default AuthService
