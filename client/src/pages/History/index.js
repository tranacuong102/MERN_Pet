import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Grid } from '@mui/material'
import Image from '../../commons/widgets/Image'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { LIST_PATH } from '../../routes'
import { getCurrentUser } from '../../models/User'
import PaymentService from '../../services/PaymentService'
import TextField from '@mui/material/TextField'
import { LoadingButton } from '@mui/lab'
import { SearchIcon } from '../../commons/widgets/Icons'

import '../../styles/pages/History.scss'

const History = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const currentUser = getCurrentUser()
    const [payments, setPayments] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [isAdmin, setIsAdmin] = useState(() => {
        return currentUser && currentUser.roles === 2
    })

    useEffect(() => {
        if (currentUser === null) {
            return
        } else if (isAdmin) {
            const getAllPayments = async () => {
                try {
                    const { data } = await PaymentService.getAllPayments()
                    setPayments(data)
                } catch (error) {
                    console.log(error)
                }
            }
            getAllPayments()
        } else {
            const getPayments = async () => {
                try {
                    const { data } = await PaymentService.getPayments()
                    setPayments(data)
                } catch (error) {
                    console.log(error)
                }
            }
            getPayments()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            phoneNumbers: '',
        },
    })

    const onSubmit = async (query) => {
        const q = query.phoneNumbers
        try {
            setLoading(true)
            console.log(q)
            const { data } = await PaymentService.searchPayments(q)
            setPayments(data)
            setLoading(false)
            reset()
        } catch (error) {
            setLoading(false)
        }
    }
    const productsPayment = payments.map((item) => [...item.products]).flat()

    const handlePayments = (product) => {
        navigate(`${LIST_PATH.PAYMENTS}/${product.slug}`)
        localStorage.setItem(
            '@currentProduct',
            JSON.stringify([{ ...product, count: 1 }])
        )
    }

    return (
        <div className="payments-history">
            {isAdmin ? (
                <div className="payments-admin">
                    <h3 className="payments-heading">
                        <p className="payments-username">
                            Xin chào: {currentUser.username}
                        </p>
                    </h3>
                    <div className="payments-admin__search">
                        <form
                            className="payments-admin__search-form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                control={control}
                                name="phoneNumbers"
                                render={({ field }) => (
                                    <TextField
                                        className="payments-admin__search-input"
                                        label="Nhập SĐT để tìm kiếm giao dịch *"
                                        variant="outlined"
                                        size="small"
                                        {...field}
                                    />
                                )}
                            />

                            <LoadingButton
                                className="payments-admin__search-submit"
                                variant="contained"
                                color="success"
                                type="submit"
                                loading={loading}
                            >
                                <SearchIcon />
                            </LoadingButton>
                        </form>
                    </div>
                    <div className="payments-admin__content">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Khách hàng</th>
                                    <th scope="col">Sản phẩm</th>
                                    <th scope="col">SĐT</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Ngày mua</th>
                                    <th scope="col">Hóa đơn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{payment.username}</td>
                                        <td className="payment-info">
                                            {payment.products.map((item) => (
                                                <li
                                                    key={item._id}
                                                    className="payment-item"
                                                >
                                                    <span className="payment-name">
                                                        {' '}
                                                        - {item.title}
                                                    </span>
                                                    <span className="payment-price">
                                                        <span>
                                                            {item.price.toLocaleString(
                                                                'vi',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'VND',
                                                                }
                                                            )}
                                                        </span>{' '}
                                                        x {item.count}
                                                    </span>
                                                </li>
                                            ))}
                                        </td>
                                        <td>{payment.phoneNumbers}</td>
                                        <td className="payment-address">
                                            {payment.address}
                                        </td>
                                        <td>
                                            {payment.createdAt
                                                .slice(0, 10)
                                                .split('-')
                                                .reverse()
                                                .join('/')}
                                        </td>
                                        <td className="payment-total">
                                            {payment.products
                                                .reduce((total, item) => {
                                                    return (
                                                        total +
                                                        item.price * item.count
                                                    )
                                                }, 0)
                                                .toLocaleString('vi', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="payments-user">
                    <h3 className="payments-heading">
                        {currentUser && currentUser ? (
                            <>
                                <p className="payments-username">
                                    Xin chào: {currentUser.username}
                                </p>
                                <p className="payments-list">
                                    {payments && payments.length > 0 ? (
                                        <span>
                                            Danh sách các giao dịch của bạn
                                        </span>
                                    ) : (
                                        <span>
                                            Bạn chưa có giao dịch nào{' '}
                                            <Link to="/products">
                                                <Button
                                                    style={{ margin: '0 10px' }}
                                                    variant="contained"
                                                    endIcon={<SendIcon />}
                                                >
                                                    Tìm kiếm thú cưng
                                                </Button>
                                            </Link>{' '}
                                            yêu thích ngay nhé
                                        </span>
                                    )}
                                </p>
                            </>
                        ) : (
                            <p>Bạn cần đăng nhập để xem lịch sử giao dịch</p>
                        )}
                    </h3>
                    {currentUser && currentUser && payments.length > 0 ? (
                        <div className="payments-user__list">
                            <Grid container spacing={2}>
                                {productsPayment.map((payment, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={index}
                                    >
                                        <div className="payments-user__item">
                                            <div className="payments-user__item-wrap">
                                                <Image
                                                    src={payment.images}
                                                    alt=""
                                                    className="payments-user__item-img"
                                                />
                                                <div className="payments-user__item-info">
                                                    <div className="payments-user__item-name">
                                                        {payment.title}
                                                    </div>
                                                    <div className="payments-user__item-origin">
                                                        Xuất xứ:{' '}
                                                        {payment.origin}
                                                    </div>
                                                    <div className="payments-user__item-price">
                                                        {payment.price.toLocaleString(
                                                            'vi',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }
                                                        )}{' '}
                                                        x {payment.count}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="payments-user__item-more">
                                                <span className="payments-user__item-total">
                                                    Thành tiền:
                                                    <span>
                                                        {(
                                                            payment.price *
                                                            payment.count
                                                        ).toLocaleString('vi', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </span>
                                                </span>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() =>
                                                        handlePayments(payment)
                                                    }
                                                >
                                                    Mua lại
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    )
}

export default History
