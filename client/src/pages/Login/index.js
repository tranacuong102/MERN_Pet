import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { LoadingButton } from '@mui/lab'
import Header from '../../commons/components/Header'
import AuthService from '../../services/AuthService'
import { useAuthInfo } from '../../stores/hooks/useAuthInfo'
import { useAccessToken } from '../../stores/hooks/useAccessToken'
import { useCartInfo } from '../../stores/hooks/useCartInfo'
import { LIST_PATH } from '../../routes'
import { getCurrentUser } from '../../models/User'

import './style.scss'

const validation = {
    username: {
        required: {
            value: true,
            message: 'Vui lòng nhập tên tài khoản',
        },
        minLength: {
            value: 6,
            message: 'Tên tài khoản phải có ít nhất 6 kí tự',
        },
    },
    password: {
        required: {
            value: true,
            message: 'Vui lòng nhập mật khẩu',
        },
    },
}

function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setAuthInfo } = useAuthInfo()
    const { setAccessToken } = useAccessToken()
    const { setCartInfo } = useCartInfo()

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (currentUser) {
            navigate(LIST_PATH.HOME)
        }
    }, [navigate])

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = async (infoLogin) => {
        try {
            setLoading(true)
            const { data, accesstoken } = await AuthService.login(infoLogin)
            await setAuthInfo(data)
            await setAccessToken(accesstoken)
            await setCartInfo(data.cart)
            setLoading(false)
            navigate(LIST_PATH.HOME)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="auth-page">
                <div className="auth-page__wrapper">
                    <h3 className="auth-header">Đăng nhập</h3>
                    <div className="auth-body">
                        <Card>
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Controller
                                        className="auth-form__group"
                                        control={control}
                                        name="username"
                                        rules={validation.username}
                                        render={({ field }) => (
                                            <TextField
                                                className="auth-form__input"
                                                label="Tên tài khoản *"
                                                variant="outlined"
                                                size="small"
                                                autoComplete="username"
                                                error={!!errors?.username}
                                                helperText={
                                                    errors?.username?.message
                                                }
                                                {...field}
                                            />
                                        )}
                                    />

                                    <Controller
                                        className="auth-form__group"
                                        control={control}
                                        name="password"
                                        rules={validation.password}
                                        render={({ field }) => (
                                            <TextField
                                                className="auth-form__input"
                                                label="Mật khẩu *"
                                                variant="outlined"
                                                size="small"
                                                type="password"
                                                autoComplete="current-password"
                                                error={!!errors?.password}
                                                helperText={
                                                    errors?.password?.message
                                                }
                                                {...field}
                                            />
                                        )}
                                    />

                                    <LoadingButton
                                        className="auth-btn__submit"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        loading={loading}
                                    >
                                        Đăng nhập
                                    </LoadingButton>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="auth-footer">
                        <div>
                            <div className="auth-forgot-password">
                                <Link to="/forgot-password">Quên mật khẩu</Link>
                            </div>
                            Bạn chưa có tài khoản?
                        </div>
                        <Link to="/register">
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Đăng ký
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
