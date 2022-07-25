import BaseService from './BaseService'

const API_END_POINT = 'api/payments'

const PaymentService = {
    getPayments: () => {
        return BaseService.get(API_END_POINT)
    },
    getAllPayments: () => {
        return BaseService.get(`${API_END_POINT}/all`)
    },
    createPayment: (data) => {
        return BaseService.post(`${API_END_POINT}/create`, data)
    },
    searchPayments: (data) => {
        return BaseService.get(`${API_END_POINT}/search?q=${data}`)
    },
}

export default PaymentService
