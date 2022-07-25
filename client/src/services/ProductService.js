import BaseService from './BaseService'
import { MyContexts } from '../contexts/MyContexts'

function ProductService() {
    const API_END_POINT = 'api/products'
    const [state] = MyContexts()
    const { type, sort, page } = state

    const getAllProducts = () => {
        return BaseService.get(`${API_END_POINT}/all`)
    }

    const getProducts = () => {
        return BaseService.get(`${API_END_POINT}?page=${page}`)
    }

    const getProductsBySort = () => {
        return BaseService.get(`${API_END_POINT}?sort=${sort}&page=${page}`)
    }

    const getProductsByType = () => {
        return BaseService.get(
            `${API_END_POINT}?name=${type}&sort=${sort}&page=${page}`
        )
    }

    const getDeletedProducts = () => {
        return BaseService.get(`${API_END_POINT}/deleted`)
    }

    const addProduct = (dataProduct) => {
        return BaseService.post(`${API_END_POINT}/create`, dataProduct)
    }

    const editProduct = (id, dataProduct) => {
        return BaseService.put(`${API_END_POINT}/update/${id}`, dataProduct)
    }

    const deleteProduct = (id) => {
        return BaseService.delete(`${API_END_POINT}/delete/${id}`)
    }

    const restoreProduct = (id) => {
        return BaseService.patch(`${API_END_POINT}/restore/${id}`)
    }
    const destroyProduct = (id) => {
        return BaseService.delete(`${API_END_POINT}/destroy/${id}`)
    }

    return {
        getProducts,
        getAllProducts,
        getDeletedProducts,
        getProductsByType,
        getProductsBySort,
        addProduct,
        editProduct,
        deleteProduct,
        restoreProduct,
        destroyProduct,
    }
}

export default ProductService
