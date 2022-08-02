import { toast } from 'react-toastify'
import { DEFAULT_TOAST_OPTIONS } from '../utils/Constants'

const CoreService = {
    showAlertSuccess: (message = '') =>
        toast.success(message, DEFAULT_TOAST_OPTIONS),
    showAlertError: (message = '') =>
        toast.error(message, DEFAULT_TOAST_OPTIONS),
    showAlertWarning: (message = '') =>
        toast.warning(message, DEFAULT_TOAST_OPTIONS),
    showAlertInfo: (message = '') => toast.info(message, DEFAULT_TOAST_OPTIONS),
}

export default CoreService
