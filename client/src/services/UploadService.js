import BaseService from './BaseService'

const API_END_POINT = 'api/upload'

const UploadService = {
    uploadImage: (formData) => {
        return BaseService.postFormData(API_END_POINT, formData)
    },
    destroyImage: (public_id) => {
        return BaseService.postFormData(`${API_END_POINT}/destroy`, public_id)
    },
}

export default UploadService
