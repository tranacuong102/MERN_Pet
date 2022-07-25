import BaseService from './BaseService'

const API_END_POINT = 'api/posts'

const PostService = {
    getPosts: () => {
        return BaseService.get(API_END_POINT)
    },
    addPost: (data) => {
        return BaseService.post(`${API_END_POINT}/create`, data)
    },
    editPost: (id, data = {}) => {
        return BaseService.put(`${API_END_POINT}/update/${id}`, data)
    },
    deletePost: (id = {}, name) => {
        return BaseService.delete(`${API_END_POINT}/delete/${id}`)
    },
}

export default PostService
