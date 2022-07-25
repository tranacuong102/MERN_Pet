import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp'
import AuthService from '../../services/AuthService'
import { useCartInfo } from '../../stores/hooks/useCartInfo'
import { getCartCurrentUser } from '../../models/User'
import Button from '../../commons/widgets/Button'

import '../../styles/pages/Cart.scss'

const Cart = () => {
    const [reloadPage, setReloadPage] = useState(false)
    const [totalCoins, setTotalCoins] = useState(0)
    const { setCartInfo } = useCartInfo()
    const cart = getCartCurrentUser()

    useEffect(() => {
        const getTotalCoins = () => {
            const newCartChecked =
                cart && cart.filter((item) => item.checked === true)
            const total =
                newCartChecked &&
                newCartChecked.reduce((prev, item) => {
                    return prev + item.price * item.count
                }, 0)
            setTotalCoins(total)
            setReloadPage(false)
        }
        getTotalCoins()
    }, [cart, reloadPage])

    const handleSetCountToCart = async (cart) => {
        await AuthService.addCart({ cart })
    }

    const handleIncrement = async (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.count += 1
            }
        })
        handleSetCountToCart(cart)
        setReloadPage(true)
        await setCartInfo([...cart])
    }

    const handleDecrement = async (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.count !== 0 ? (item.count -= 1) : (item.count = 0)
            }
        })

        handleSetCountToCart(cart)
        setReloadPage(true)
        await setCartInfo([...cart])
    }

    const handleDeleteCartItem = async (id) => {
        const newCart = cart.filter((item) => item._id !== id)
        await setCartInfo(newCart)
        await AuthService.addCart({ cart: newCart })
    }

    const handleCheckedItem = async () => {
        await setCartInfo(cart)
    }

    const isCheckedInCart =
        cart && cart.filter((item) => item.checked === true && item.count !== 0)

    return (
        <div className="cart-main">
            <h2>Giỏ hàng</h2>
            <p className="cart-count">
                Bạn đang có {cart && cart.length} sản phẩm trong giỏ hàng
            </p>
            <div className="cart-content">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={7} md={8}>
                        <div className="cart-list">
                            <div className="cart-item">
                                {cart &&
                                    cart.map((item) => {
                                        return (
                                            <div
                                                className="cart-item__box"
                                                key={item._id}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    onChange={() =>
                                                        handleCheckedItem(
                                                            (item.checked =
                                                                !item.checked)
                                                        )
                                                    }
                                                />
                                                <div className="cart-item__wrapper">
                                                    <div className="cart-item__content">
                                                        <img
                                                            src={item.images}
                                                            alt=""
                                                        />
                                                        <div className="cart-item__info">
                                                            <h3 className="cart-item__info-name">
                                                                {item.title}
                                                            </h3>
                                                            <p className="cart-item__info-origin">
                                                                Xuất xứ: {''}
                                                                {item.origin}
                                                            </p>
                                                            <div className="cart-item__info-price">
                                                                {item.price.toLocaleString(
                                                                    'vi',
                                                                    {
                                                                        style: 'currency',
                                                                        currency:
                                                                            'VND',
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="cart-item__actions">
                                                    <div
                                                        className="cart-item__clear"
                                                        onClick={() =>
                                                            handleDeleteCartItem(
                                                                item._id
                                                            )
                                                        }
                                                    >
                                                        <ClearIcon />
                                                    </div>
                                                    <div className="cart-item__quantity">
                                                        <Button
                                                            disable={
                                                                item.count === 0
                                                            }
                                                            className="cart-item__quantity-down"
                                                            onClick={() =>
                                                                handleDecrement(
                                                                    item._id
                                                                )
                                                            }
                                                        >
                                                            <RemoveSharpIcon />
                                                        </Button>
                                                        <span className="cart-item__quantity-number">
                                                            {item.count}
                                                        </span>
                                                        <Button
                                                            className="cart-item__quantity-up"
                                                            onClick={() =>
                                                                handleIncrement(
                                                                    item._id
                                                                )
                                                            }
                                                        >
                                                            <AddIcon />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={5} md={4}>
                        <div className="cart-bill">
                            <h3 className="cart-bill__heading">Hóa đơn</h3>
                            <div className="cart-bill__total-number">
                                <span>Tổng cộng</span>
                                <span>{cart && cart.length} sản phẩm</span>
                            </div>
                            <div className="cart-bill__total-price">
                                <span>Giá bán</span>
                                <span>
                                    {totalCoins.toLocaleString('vi', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </span>
                            </div>
                            <Button
                                disable={
                                    isCheckedInCart &&
                                    isCheckedInCart.length === 0
                                }
                                to="/payments"
                                fullWidth
                                className="btn-checkout"
                            >
                                THANH TOÁN
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Cart
