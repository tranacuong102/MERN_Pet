import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { LoadingButton } from '@mui/lab'

import AuthService from '../../services/AuthService'
import Header from '../../commons/components/Header'
import { REGEX_PASSWORD } from '../../utils/Constants'
import { LIST_PATH } from '../../routes'
import { getCurrentUser } from '../../models/User'

import '../Login/style.scss'

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
    email: {
        required: {
            value: true,
            message: 'Vui lòng nhập email',
        },
        minLength: {
            value: 3,
            message: 'Tên tài khoản phải có ít nhất 3 kí tự',
        },
    },
    password: {
        required: {
            value: true,
            message: 'Vui lòng nhập mật khẩu',
        },
        pattern: {
            value: REGEX_PASSWORD,
            message: 'Mật khẩu phải bao gồm 1 chữ in HOA và 1 kí tự đặc biệt',
        },
    },
    confirmPassword: {
        required: {
            value: true,
            message: 'Xác thực mật khẩu không trùng khớp',
        },
        pattern: {
            value: REGEX_PASSWORD,
            message: 'Mật khẩu không đúng định dạng',
        },
    },
}

function Register() {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (infoSubmit) => {
        try {
            setLoading(true)
            await AuthService.register(infoSubmit)
            setLoading(false)
            navigate(`/${LIST_PATH.LOGIN}`)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (currentUser) {
            navigate(LIST_PATH.HOME)
        }
    }, [navigate])

    return (
        <div className="wrapper">
            <Header />
            <div className="auth-page">
                <div className="auth-page__wrapper">
                    <h3 className="auth-header">Đăng ký</h3>
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
                                                autoComplete="username"
                                                size="small"
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
                                        name="email"
                                        rules={validation.email}
                                        render={({ field }) => (
                                            <TextField
                                                className="auth-form__input"
                                                label="Email đăng ký *"
                                                variant="outlined"
                                                autoComplete="email"
                                                size="small"
                                                error={!!errors?.email}
                                                helperText={
                                                    errors?.email?.email
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
                                                autoComplete="new-password"
                                                type="password"
                                                error={!!errors?.password}
                                                helperText={
                                                    errors?.password?.message
                                                }
                                                {...field}
                                            />
                                        )}
                                    />

                                    <Controller
                                        className="auth-form__group"
                                        control={control}
                                        name="confirmPassword"
                                        rules={validation.confirmPassword}
                                        render={({ field }) => (
                                            <TextField
                                                className="auth-form__input"
                                                label="Nhập lại mật khẩu *"
                                                variant="outlined"
                                                autoComplete="new-password"
                                                size="small"
                                                type="password"
                                                error={
                                                    !!errors?.confirmPassword
                                                }
                                                helperText={
                                                    errors?.confirmPassword
                                                        ?.message
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
                                        Đăng ký
                                    </LoadingButton>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="auth-footer">
                        <div>Bạn đã có tài khoản?</div>
                        <Link to="/login">
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Đăng nhập
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
