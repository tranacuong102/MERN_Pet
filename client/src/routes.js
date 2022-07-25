import React from 'react'

/* My Path */
export const LIST_PATH = {
    HOME: '/*',
    LOGIN: 'login',
    REGISTER: 'register',
    PROFILE: '/profile',
    PRODUCTS: '/products',
    CREATE_CATEGORY: '/create-category',
    CREATE_POST: '/create-post',
    CREATE_PRODUCT: '/create-product',
    DELETED_PRODUCTS: '/deleted-products',
    DETAIL_PRODUCT: '/products/:slug',
    CART: '/cart',
    PAYMENTS: '/payments',
    DETAILPAYMENTS: '/payments/:slug',
    POSTS: '/posts',
    HISTORY: '/history',
}

/* My router */
const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Profile = React.lazy(() => import('./pages/Profile'))
const CreateCategory = React.lazy(() => import('./pages/CreateCategory'))
const CreatePost = React.lazy(() => import('./pages/CreatePost'))
const CreateProduct = React.lazy(() => import('./pages/CreateProduct'))
const Products = React.lazy(() => import('./pages/Products'))
const DeletedProducts = React.lazy(() => import('./pages/DeletedProducts'))
const DetailProduct = React.lazy(() => import('./pages/DetailProduct'))
const Cart = React.lazy(() => import('./pages/Cart'))
const Payments = React.lazy(() => import('./pages/Payments'))
const DetailPayments = React.lazy(() => import('./pages/DetailPayments'))
const Posts = React.lazy(() => import('./pages/Posts'))
const History = React.lazy(() => import('./pages/History'))

export const PUBLIC_ROUTES = [
    {
        path: LIST_PATH.HOME,
        exact: false,
        name: 'Trang chủ',
        component: Home,
    },
    {
        path: LIST_PATH.LOGIN,
        exact: true,
        name: 'Đăng nhập',
        component: Login,
    },
    {
        path: LIST_PATH.REGISTER,
        exact: true,
        name: 'Đăng ký',
        component: Register,
    },
    {
        path: LIST_PATH.PRODUCTS,
        exact: true,
        name: 'Sản phẩm',
        component: Products,
    },
    {
        path: LIST_PATH.DETAIL_PRODUCT,
        exact: true,
        name: 'Chi tiết sản phẩm',
        component: DetailProduct,
    },
    {
        path: LIST_PATH.POSTS,
        exact: true,
        name: 'Chương trình khuyến mại',
        component: Posts,
    },
]

export const PRIVATE_ROUTES = [
    {
        path: LIST_PATH.PROFILE,
        component: Profile,
    },
    {
        path: LIST_PATH.CREATE_CATEGORY,
        component: CreateCategory,
    },
    {
        path: LIST_PATH.CREATE_PRODUCT,
        component: CreateProduct,
    },
    {
        path: LIST_PATH.DELETED_PRODUCTS,
        component: DeletedProducts,
    },
    {
        path: LIST_PATH.CART,
        component: Cart,
    },
    {
        path: LIST_PATH.PAYMENTS,
        component: Payments,
    },
    {
        path: LIST_PATH.DETAILPAYMENTS,
        component: DetailPayments,
    },
    {
        path: LIST_PATH.CREATE_POST,
        component: CreatePost,
    },
    {
        path: LIST_PATH.HISTORY,
        component: History,
    },
]
