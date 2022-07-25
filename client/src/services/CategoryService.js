import BaseService from './BaseService'

const API_END_POINT = 'api/categories'

const CategoryService = {
    getCategories: () => {
        return BaseService.get(API_END_POINT)
    },
    addCategory: (data) => {
        return BaseService.post(`${API_END_POINT}/create`, data)
    },
    editCategory: (id, data = {}) => {
        return BaseService.put(`${API_END_POINT}/update/${id}`, data)
    },
    deleteCategory: (id) => {
        return BaseService.delete(`${API_END_POINT}/delete/${id}`)
    },
}

export default CategoryService
