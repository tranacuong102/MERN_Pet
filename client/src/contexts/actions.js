import {
    SET_TYPE,
    SET_SORT,
    SET_PAGE,
    SET_EDIT_PRODUCT,
    SET_VALUE_PRODUCT,
    SET_EDIT_POST,
    SET_VALUE_DEFAULT_POST,
} from '../utils/Constants'

export const setType = (payload) => ({
    type: SET_TYPE,
    payload,
})
export const setSort = (payload) => ({
    type: SET_SORT,
    payload,
})
export const setPage = (payload) => ({
    type: SET_PAGE,
    payload,
})
export const setEditProduct = (payload) => ({
    type: SET_EDIT_PRODUCT,
    payload,
})
export const setValueProduct = (payload) => ({
    type: SET_VALUE_PRODUCT,
    payload,
})
export const setEditPost = (payload) => ({
    type: SET_EDIT_POST,
    payload,
})
export const setValueDefaultPost = (payload) => ({
    type: SET_VALUE_DEFAULT_POST,
    payload,
})
