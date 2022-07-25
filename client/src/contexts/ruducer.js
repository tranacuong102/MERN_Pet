import {
    SET_TYPE,
    SET_SORT,
    SET_PAGE,
    SET_EDIT_PRODUCT,
    SET_VALUE_PRODUCT,
    // SET_ADD_CART,
    SET_EDIT_POST,
    SET_VALUE_DEFAULT_POST,
} from '../utils/Constants'

// import { getCartCurrentUser } from '../models/User'
// const userInfoCart = getCartCurrentUser()

export const initState = {
    type: 'all',
    sort: '-createdAt',
    page: 1,
    isEditProduct: false,
    defaultValueProduct: {
        product_id: '',
        title: '',
        price: '',
        discount: 0,
        quantity: '',
        origin: '',
        description: '',
        images: '',
        category: '',
    },
    // cart: userInfoCart && userInfoCart,
    editPost: false,
    post: {
        post_id: '',
        title: '',
        images: '',
        description: '',
    },
}

function reducer(state, action) {
    switch (action.type) {
        case SET_TYPE:
            return {
                ...state,
                type: action.payload,
            }
        case SET_SORT:
            return {
                ...state,
                sort: action.payload,
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
            }
        case SET_EDIT_PRODUCT:
            return {
                ...state,
                isEditProduct: action.payload,
            }
        case SET_VALUE_PRODUCT:
            return {
                ...state,
                defaultValueProduct: action.payload,
            }
        case SET_EDIT_POST:
            return {
                ...state,
                editPost: action.payload,
            }
        case SET_VALUE_DEFAULT_POST:
            return {
                ...state,
                post: action.payload,
            }
        default:
            throw new Error('Invalid action')
    }
}

export default reducer
