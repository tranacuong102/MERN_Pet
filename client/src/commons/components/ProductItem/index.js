import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getCartCurrentUser } from '../../../models/User'
import Modal from '../../widgets/Modal'
import Button from '../../widgets/Button'
import { useCartInfo } from '../../../stores/hooks/useCartInfo'
import useStore from '../../../stores/hooks/useStore'
import {
    setEditProduct,
    setValueProduct,
} from '../../../stores/context/actions'
import ProductService from '../../../services/ProductService'
import AuthService from '../../../services/AuthService'
import CoreService from '../../../services/CoreService'
import { LIST_PATH } from '../../../routes'

import './style.scss'

function ProductItem({ product, callbackFn }) {
    const navigate = useNavigate()
    const { setCartInfo } = useCartInfo()
    const currentUser = getCurrentUser()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [idProduct, setIdProduct] = useState('')
    const [nameProduct, setNameProduct] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [isAdmin, setIsAdmin] = useState(() => {
        return currentUser && currentUser.roles === 2
    })
    const productsService = ProductService()
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useStore()

    const cart = getCartCurrentUser()

    const fixProductPriceOld = () => {
        const num = (product.price * 100) / (100 - product.discount)
        const fix = num
            .toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
            })
            .split('.')

        fix.splice([fix.length - 1], 1, '000 ₫')
        const result = fix.join('.')
        return result
    }

    const handleUpdate = (product) => {
        dispatch(setEditProduct(true))
        dispatch(
            setValueProduct({
                product_id: product._id,
                title: product.title,
                price: product.price,
                discount: product.discount,
                quantity: product.quantity,
                origin: product.origin,
                description: product.description,
                images: product.images,
                category: product.category,
            })
        )
        navigate(LIST_PATH.CREATE_PRODUCT)
    }

    // DELETE PRODUCT
    const handleClickOpenModal = (id, title) => {
        setOpen(true)
        setNameProduct(title)
        setIdProduct(id)
    }
    const handleDelete = async () => {
        try {
            setLoading(true)
            await productsService.deleteProduct(idProduct)
            setOpen(false)
            setLoading(false)
            callbackFn(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAddToCart = async (product) => {
        if (!currentUser) {
            CoreService.showAlertError(
                'Bạn cần đăng nhập để thực hiện chức năng này!'
            )
            return null
        }

        const checkCart =
            cart &&
            cart.every((item) => {
                return item._id !== product._id
            })

        if (checkCart) {
            await AuthService.addCart({
                cart: [
                    ...cart,
                    {
                        ...product,
                        count: 1,
                    },
                ],
            })
            await setCartInfo([...cart, { ...product, count: 1 }])
        } else {
            CoreService.showAlertWarning(
                'Sản phẩm này đã nằm trong giỏ hàng của bạn!'
            )
        }
    }

    const handleNavigateToDetailt = (slug) => {
        navigate(`${LIST_PATH.PRODUCTS}/${slug}`)
    }

    const handlePayments = (product) => {
        navigate(`${LIST_PATH.PAYMENTS}/${product.slug}`)
        localStorage.setItem(
            '@currentProduct',
            JSON.stringify([{ ...product, count: 1 }])
        )
    }

    return (
        <div className="product">
            <div
                onClick={() => handleNavigateToDetailt(product.slug)}
                className="product-img"
                style={{
                    backgroundImage: `url(${product.images})`,
                }}
            ></div>

            <div
                className="product-info"
                onClick={() => handleNavigateToDetailt(product.slug)}
            >
                <h4 className="product-title">{product.title}</h4>
                <div className="product-price">
                    <div className="product-price-new">
                        {product.price.toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </div>
                    {product.discount !== 0 && product.discount !== null && (
                        <div className="product-price-old">
                            {fixProductPriceOld()}
                        </div>
                    )}
                </div>
                <div className="product-number">
                    <div className="product-number__not-sold">
                        Còn lại: {product.quantity - product.sold}
                    </div>
                    <div className="product-number__sold">
                        {product.sold} đã bán
                    </div>
                </div>
                <div className="product-origin">
                    <span>Xuất xứ</span>
                    <span>{product.origin}</span>
                </div>
                {product.discount !== 0 && product.discount !== null && (
                    <div className="product-sale">
                        <div className="product-sale__precent">
                            {product.discount} %
                        </div>
                        <div className="product-sale__text">GIẢM</div>
                    </div>
                )}
            </div>
            <div className="product-actions">
                {isAdmin ? (
                    <>
                        <Button
                            primary
                            className="product-action__item"
                            onClick={() =>
                                handleClickOpenModal(product._id, product.title)
                            }
                        >
                            DELETE
                        </Button>
                        <Button
                            success
                            className="product-action__item"
                            onClick={() => handleUpdate(product)}
                        >
                            UPDATE
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            primary
                            className="product-action__item"
                            onClick={() => handlePayments(product)}
                        >
                            BUY NOW
                        </Button>
                        <Button
                            success
                            className="product-action__item"
                            onClick={() => handleAddToCart(product)}
                        >
                            ADD CART
                        </Button>
                    </>
                )}
            </div>
            {open && (
                <Modal
                    open={open}
                    loading={loading}
                    handleDelete={handleDelete}
                    handleClose={handleClose}
                >
                    {` SẢN PHẨM: ${nameProduct}`}
                </Modal>
            )}
        </div>
    )
}

export default ProductItem
