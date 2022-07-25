import BaseService from './BaseService'

const API_END_POINT = 'api/search'

const SearchService = {
    get: (searchTerm) => {
        return BaseService.get(`${API_END_POINT}?q=${searchTerm}`)
    },
}

export default SearchService
