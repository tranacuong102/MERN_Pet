import axios from 'axios'
import { getAccessToken } from '../models/User'
import { API_SUCCESS_STATUS, UNKNOWN_ERROR_MESSAGE } from '../utils/Constants'
import CoreService from './CoreService'
import { processParams } from '../utils/Helper'

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        common: {
            'Content-Type': 'application/json',
        },
    },
})

const instanceFormData = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        common: {
            'Content-Type': 'multipart/form-data',
        },
    },
})

const handleError = (error = {}) => {
    if (error.response) {
        CoreService.showAlertError(error.response.data.message)
        return
    }
    CoreService.showAlertError(UNKNOWN_ERROR_MESSAGE)
}

const initial = () => {
    const accessToken = getAccessToken()

    if (accessToken) {
        instance.defaults.headers.common.Authorization = 'Bearer ' + accessToken
        instanceFormData.defaults.headers.common.Authorization =
            'Bearer ' + accessToken
    }
}

const BaseService = {
    get: (url = '', params) => {
        if (params) {
            url = processParams(url, params)
        }
        initial()

        return new Promise(async (resolve, reject) => {
            await instance
                .get(url)
                .then((response) => {
                    const totalRow = response.headers['x-total-count'] || 0
                    const { status, message, totalResult, totalCount } =
                        response.data
                    const data = {
                        ...response.data,
                        totalResult,
                        totalCount,
                        totalRow,
                    }
                    if (!status || parseFloat(status) !== API_SUCCESS_STATUS) {
                        CoreService.showAlertError(message)
                        CoreService.hideLoading()
                        reject(message)
                    }
                    resolve(data)
                })
                .catch((error) => {
                    CoreService.hideLoading()
                    reject(handleError(error))
                    console.log(error)
                })
        })
    },

    post: (url = '', body = {}, params, config = {}) =>
        new Promise(async (resolve, reject) => {
            if (params) {
                url = processParams(url, params)
            }
            initial()

            await instance
                .post(url, body, config)
                .then((response) => {
                    const totalRow = response.headers['x-total-count'] || 0
                    const { status, message } = response.data
                    if (!status || parseFloat(status) !== API_SUCCESS_STATUS) {
                        CoreService.showAlertError(message)
                        CoreService.hideLoading()
                        reject(message)
                    }

                    CoreService.showAlertSuccess(message)
                    resolve({ ...response.data, totalRow })
                })
                .catch((error) => {
                    CoreService.hideLoading()
                    reject(handleError(error))
                    console.log(error)
                })
        }),

    postFormData: (url = '', body = {}, params, config = {}, fileName = '') =>
        new Promise(async (resolve, reject) => {
            if (params) {
                url = processParams(url, params)
            }
            initial()

            await instanceFormData
                .post(url, body, config)
                .then((response) => {
                    CoreService.hideLoading()
                    resolve(response.data)
                })
                .catch(async (error) => {
                    const responseObj = await error.response.data.message
                    CoreService.showAlertError(JSON.parse(responseObj).message)
                    CoreService.hideLoading()
                })
        }),

    put: (url = '', body = {}, params, config) =>
        new Promise(async (resolve, reject) => {
            if (params) {
                url = processParams(url, params)
            }
            initial()

            await instance
                .put(url, body, config)
                .then((response) => {
                    const { status, message } = response.data
                    if (!status || parseFloat(status) !== API_SUCCESS_STATUS) {
                        CoreService.showAlertError(message)
                        CoreService.hideLoading()
                        reject(message)
                    }
                    CoreService.showAlertSuccess(message)
                    resolve(response.data)
                })
                .catch((error) => {
                    CoreService.hideLoading()
                    reject(handleError(error))
                })
        }),

    delete: (url = '', params, config = {}) => {
        new Promise(async (resolve, reject) => {
            if (params) {
                url = processParams(url, params)
            }
            initial()

            await instance
                .delete(url, config)
                .then((response) => {
                    const { status, message } = response.data
                    if (!status || parseFloat(status) !== API_SUCCESS_STATUS) {
                        CoreService.showAlertError(message)
                        CoreService.hideLoading()
                        reject(message)
                    }
                    CoreService.showAlertSuccess(message)
                    resolve(response.data)
                })
                .catch((error) => {
                    CoreService.hideLoading()
                    reject(handleError(error))
                    console.log(error)
                })
        })
    },

    patch: (url = '', body = {}, params, config) =>
        new Promise(async (resolve, reject) => {
            if (params) {
                url = processParams(url, params)
            }
            initial()

            await instance
                .patch(url, body, config)
                .then((response) => {
                    const { status, message } = response.data
                    if (!status || parseFloat(status) !== API_SUCCESS_STATUS) {
                        CoreService.showAlertError(message)
                        CoreService.hideLoading()
                        reject(message)
                    }
                    CoreService.showAlertSuccess(message)
                    resolve(response.data.data)
                })
                .catch((error) => {
                    CoreService.hideLoading()
                    reject(handleError(error))
                })
        }),
}

export default BaseService
