import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import { LoadingButton } from '@mui/lab'
import { getCurrentUser, getCartCurrentUser } from '../../models/User'
import Momo from '../../assets/images/momo.png'
import ATM from '../../assets/images/atm.png'
import Visa from '../../assets/images/visa.png'
import Button from '../../commons/widgets/Button'
import SendIcon from '@mui/icons-material/Send'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import PaymentService from '../../services/PaymentService'
import AuthService from '../../services/AuthService'
import { LIST_PATH } from '../../routes'
import CoreService from '../../services/CoreService'

import '../../styles/pages/Payments.scss'

const validation = {
    username: {
        required: {
            value: true,
            message: 'Vui lòng nhập tên người nhận hàng',
        },
    },
    phoneNumbers: {
        required: {
            value: true,
            message: 'Số điện thoại người nhận',
        },
    },
    address: {
        required: {
            value: true,
            message: 'Nhập địa chỉ nhận hàng',
        },
    },
}

const Payments = () => {
    const currentUser = getCurrentUser()
    const navigate = useNavigate()
    const [totalCoins, setTotalCoins] = useState(0)
    const [loading, setLoading] = useState(false)
    const cart = getCartCurrentUser()
    useEffect(() => {
        const getTotalCoins = () => {
            const newCartChecked = cart.filter(
                (item) => item.checked === true && item.count !== 0
            )
            const total = newCartChecked.reduce((prev, item) => {
                return prev + item.price * item.count
            }, 0)
            setTotalCoins(total)
        }
        getTotalCoins()
    }, [cart])

    const newCheckedInCart = cart.filter(
        (item) => item.checked === true && item.count !== 0
    )

    const prevCart = cart.filter(
        (item) => item.checked === false || item.count === 0
    )

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            phoneNumbers: '',
            address: '',
        },
    })

    const onSubmit = async (infoPayments) => {
        setLoading(true)
        if (!currentUser) {
            CoreService.showAlertError('Bạn cần đang nhập để mua sản phẩm này')
            return
        }
        if (currentUser.coins - totalCoins < 0) {
            CoreService.showAlertError(
                'Tài khoản của bạn không đủ để thanh toán đơn hàng này'
            )
            setLoading(false)
            return
        } else {
            await AuthService.buyCart({
                ...currentUser,
                coins: currentUser.coins - totalCoins,
                cart: prevCart,
            })
        }
        try {
            await PaymentService.createPayment({
                user_id: currentUser._id,
                ...infoPayments,
                products: [...newCheckedInCart],
                cart: prevCart,
            })

            await localStorage.setItem(
                '@currentAuth',
                JSON.stringify({
                    ...currentUser,
                    coins: currentUser.coins - totalCoins,
                    cart: prevCart,
                })
            )
            await localStorage.setItem('@cartInfo', JSON.stringify(prevCart))
            navigate(LIST_PATH.HISTORY)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <div className="wrapper">
            <div className="payments">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={7}>
                        <Button
                            to="/cart"
                            primary
                            className="payments__back-cart"
                            iconLeft={<SendIcon />}
                        >
                            GIỎ HÀNG
                        </Button>
                        <h3 className="payments__heading">Thanh toán</h3>
                        <div className="payments__wrapper">
                            <h3 className="payments__list-header">
                                Qua ví trên website
                            </h3>
                            <p className="payments__coins">
                                Số dư trong ví:{' '}
                                <span>
                                    {currentUser &&
                                        currentUser.coins.toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                </span>
                            </p>
                        </div>
                        <div className="payments__wrapper">
                            <h3 className="payments__list-header">
                                Chuyển khoản trực tiếp
                            </h3>
                            <ul className="payments__list">
                                <li className="payments__item">
                                    <img src={Momo} alt="" />
                                    <span className="payments__item-name">
                                        Ví MoMo
                                    </span>
                                </li>
                                <li className="payments__item">
                                    <img src={Visa} alt="" />
                                    <span className="payments__item-name">
                                        Thẻ Quốc Tế
                                    </span>
                                </li>
                                <li className="payments__item">
                                    <img
                                        src={ATM}
                                        className="payment__item-banking"
                                        alt=""
                                    />
                                    <span className="payments__item-name">
                                        Thẻ ATM
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="payments__wrapper">
                            <h3 className="payments__list-header">
                                Lần mua này gồm{' '}
                                <span> {newCheckedInCart.length} </span> sản
                                phẩm
                            </h3>
                            <ul className="payments__list-content">
                                {newCheckedInCart.map((item) => (
                                    <li
                                        className="payments__list-item"
                                        key={item._id}
                                    >
                                        <span>
                                            <TaskAltIcon />
                                        </span>
                                        <h4 className="payments__list-item-name">
                                            {item.title}
                                        </h4>
                                        <div className="payments__list-item-price">
                                            <span>
                                                {item.price.toLocaleString(
                                                    'vi',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }
                                                )}
                                            </span>
                                            <pre>x{item && item.count}</pre>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <div className="payments-bill">
                            <div className="cart-bill">
                                <h3 className="cart-bill__heading">Hóa đơn</h3>
                                <div className="cart-bill__total-number">
                                    <span>Tổng cộng</span>
                                    <span>
                                        {' '}
                                        {newCheckedInCart.length} sản phẩm
                                    </span>
                                </div>
                                <div className="cart-bill__total-price">
                                    <span>Giá bán </span>
                                    <span className="cart-bill__total-price-num">
                                        {totalCoins.toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                </div>
                                <Button
                                    disable={!currentUser}
                                    to="/payments"
                                    fullWidth
                                    className="btn-checkout"
                                >
                                    XÁC NHẬN THANH TOÁN
                                </Button>
                            </div>
                            <div className="payments-bill__info">
                                {!currentUser ? (
                                    <p className="payments-bill__info-none">
                                        Bạn cần đăng nhập để hoàn thành giao
                                        dịch!
                                    </p>
                                ) : (
                                    <div className="payments-bill__info-user">
                                        <div className="payments-bill__info-heading">
                                            Nhập thông tin người nhận và bấm nút{' '}
                                            <span>XÁC NHẬN THANH TOÁN</span> để
                                            hoàn thành giao dịch!
                                        </div>
                                        <CardContent>
                                            <form
                                                onSubmit={handleSubmit(
                                                    onSubmit
                                                )}
                                            >
                                                <Controller
                                                    control={control}
                                                    name="username"
                                                    rules={validation.username}
                                                    render={({ field }) => (
                                                        <TextField
                                                            className="Buyer-info__item"
                                                            label="Tên người nhận *"
                                                            variant="outlined"
                                                            size="small"
                                                            error={
                                                                !!errors?.username
                                                            }
                                                            helperText={
                                                                errors?.username
                                                                    ?.message
                                                            }
                                                            {...field}
                                                        />
                                                    )}
                                                />

                                                <Controller
                                                    control={control}
                                                    name="phoneNumbers"
                                                    rules={
                                                        validation.phoneNumbers
                                                    }
                                                    render={({ field }) => (
                                                        <TextField
                                                            className="Buyer-info__item"
                                                            label="Số điện thoại *"
                                                            variant="outlined"
                                                            size="small"
                                                            type="text"
                                                            error={
                                                                !!errors?.phoneNumbers
                                                            }
                                                            helperText={
                                                                errors
                                                                    ?.phoneNumbers
                                                                    ?.message
                                                            }
                                                            {...field}
                                                        />
                                                    )}
                                                />

                                                <Controller
                                                    control={control}
                                                    name="address"
                                                    rules={validation.address}
                                                    render={({ field }) => (
                                                        <TextField
                                                            className="Buyer-info__item"
                                                            label="Địa chỉ *"
                                                            variant="outlined"
                                                            size="small"
                                                            type="text"
                                                            error={
                                                                !!errors?.address
                                                            }
                                                            helperText={
                                                                errors?.address
                                                                    ?.message
                                                            }
                                                            {...field}
                                                        />
                                                    )}
                                                />
                                                <LoadingButton
                                                    className="payments-btn-buy"
                                                    variant="contained"
                                                    type="submit"
                                                    loading={loading}
                                                >
                                                    Xác nhận thanh toán
                                                </LoadingButton>
                                            </form>
                                        </CardContent>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Payments
