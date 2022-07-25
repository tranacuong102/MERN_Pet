export const API_SUCCESS_STATUS = 200

export const UNKNOWN_ERROR_MESSAGE = 'Có lỗi hệ thống xảy ra!'

export const LOCAL_STORAGE = {
    AUTH_INFO: '@currentAuth',
    ACCESS_TOKEN: '@accessToken',
    CART_INFO: '@cartInfo',
}

export const MODAL = {
    DEFAULT_TEXT_OK: 'Đồng ý',
    DEFAULT_TEXT_CANCEL: 'Hủy bỏ',
    DEFAULT_TITLE: 'Bạn có chắc chắn muốn xóa dữ liệu này?',
    DEFAULT_CONTENT: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.`,
    DEFAULT_TITLE_CONFIRM: 'Xác nhận',
}

// TODO: TOAST INFO
export const DEFAULT_TOAST_OPTIONS = {
    autoClose: 3000,
    pauseOnFocusLoss: false,
    theme: 'colored',
}

export const REGEX_PASSWORD =
    /^(?=.*[a-z]+)(?=.*\d+)(?=.*[A-Z]+)(?=.*[^\w]+)[ -~]+$/

// Type actions reducer
export const SET_TYPE = 'set_type'
export const SET_SORT = 'set_sort'
export const SET_PAGE = 'set_page'
export const SET_EDIT_PRODUCT = 'set_edit_product'
export const SET_VALUE_PRODUCT = 'set_value_product'
export const SET_EDIT_POST = 'set_edit_post'
export const SET_VALUE_DEFAULT_POST = 'set_value_default_post'
