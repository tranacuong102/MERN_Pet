import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import Grid from '@mui/material/Grid'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import Header from '../../commons/components/Header'
import Footer from '../../commons/components/Footer'
import ProductItem from '../../commons/components/ProductItem'
import ProductService from '../../services/ProductService'
import Button from '../../commons/widgets/Button'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import { getCurrentUser, getCartCurrentUser } from '../../models/User'
import CoreService from '../../services/CoreService'
import { useCartInfo } from '../../stores/hooks/useCartInfo'
import AuthService from '../../services/AuthService'
import { LIST_PATH } from '../../routes'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../styles/pages/DetailProduct.scss'

const DetailProduct = () => {
    const [products, setProducts] = useState([])
    const [detailProduct, setDetailProduct] = useState('')
    const [reloadPage, setReloadPage] = useState(false)
    const currentUser = getCurrentUser()
    const { setCartInfo } = useCartInfo()
    const params = useParams()
    const navigate = useNavigate()
    const productsService = ProductService()
    const cart = getCartCurrentUser()
    const handleConvertStrToArray = (str) => {
        const newArray = str.split('.')
        // eslint-disable-next-line no-unused-vars
        const fixArray = newArray.shift()
        return newArray
    }

    const handleAddToCart = async (product) => {
        if (!currentUser) {
            CoreService.showAlertError(
                'Bạn cần đăng nhập để thực hiện chức năng này!'
            )
            return null
        }

        const checkCart = cart.every((item) => {
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
            CoreService.showAlertError(
                'Sản phẩm này đã nằm trong giỏ hàng của bạn!'
            )
        }
    }

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await productsService.getAllProducts()
                setProducts(data)
                setReloadPage(false)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadPage])

    useEffect(() => {
        if (params.slug) {
            products.forEach((product) => {
                if (product.slug === params.slug) setDetailProduct(product)
            })
        }
    }, [params.slug, products])

    const productsFilterSlug = products.filter(
        (product) =>
            product.category === detailProduct.category &&
            product.slug !== detailProduct.slug
    )

    const callbackFn = (childData) => {
        setReloadPage(childData)
    }

    const handleToPayments = (product) => {
        navigate(`${LIST_PATH.PAYMENTS}/${product.slug}`)
        localStorage.setItem(
            '@currentProduct',
            JSON.stringify([{ ...product, count: 1 }])
        )
    }

    const settings = {
        lazyLoad: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 899,
                settings: {
                    autoplay: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 599,
                settings: {
                    autoplay: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 399,
                settings: {
                    autoplay: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="main-body">
                <div className="container">
                    <div className="detail-product">
                        <div className="detail-product__info">
                            <Grid container spacing={6}>
                                <Grid item xs={12} sm={7} md={8}>
                                    <h2 className="detail-product__info-title">
                                        {detailProduct.title}
                                    </h2>
                                    <div className="detail-product__info-desc">
                                        {detailProduct &&
                                            handleConvertStrToArray(
                                                detailProduct.description
                                            ).map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                    </div>
                                    <div className="store-commit">
                                        <h3 className="store-commit__heading">
                                            CAM KẾT TỪ CỬA HÀNG
                                        </h3>
                                        <ul className="store-commit__list">
                                            <li className="store-commit__item">
                                                <TaskAltIcon />
                                                <span>
                                                    Miễn phí ship nội thành, hỗ
                                                    trợ phí ship toàn quốc
                                                </span>
                                            </li>
                                            <li className="store-commit__item">
                                                <TaskAltIcon />
                                                <span>
                                                    Chấp nhận đổi trả sau 7 ngày
                                                    nếu khách hàng không hài
                                                    lòng
                                                </span>
                                            </li>
                                            <li className="store-commit__item">
                                                <TaskAltIcon />
                                                <span>
                                                    Cam kết các dịch vụ chăm sóc
                                                    thú cưng ân cần và chuyên
                                                    nghiệp
                                                </span>
                                            </li>
                                            <li className="store-commit__item">
                                                <TaskAltIcon />
                                                <span>
                                                    Hoàn tiền 100% nếu thú cưng
                                                    không khỏe mạnh, có bệnh tật
                                                </span>
                                            </li>
                                            <li className="store-commit__item">
                                                <TaskAltIcon />
                                                <span>
                                                    Miễn phí tư vấn, hỗ trợ
                                                    khách hàng chăm sóc thú cưng
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={5} md={4}>
                                    <div className="detail-product__cart">
                                        <img
                                            src={detailProduct.images}
                                            alt=""
                                        />
                                        <div className="detail-product__cart-info">
                                            {detailProduct && (
                                                <div className="product-price">
                                                    {detailProduct.price.toLocaleString(
                                                        'vi',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }
                                                    )}
                                                </div>
                                            )}
                                            <Button
                                                fullWidth
                                                className="detail-product__cart-btn"
                                                onClick={() =>
                                                    handleAddToCart(
                                                        detailProduct
                                                    )
                                                }
                                            >
                                                Thêm giỏ hàng
                                            </Button>
                                            <Button
                                                fullWidth
                                                className="detail-product__cart-btn detail-product__cart-btn--buy"
                                                onClick={() =>
                                                    handleToPayments(
                                                        detailProduct
                                                    )
                                                }
                                            >
                                                Mua ngay
                                            </Button>
                                            <div className="product-number">
                                                <div className="product-number__not-sold">
                                                    Còn lại:{' '}
                                                    {detailProduct.quantity -
                                                        detailProduct.sold}
                                                </div>
                                                <div className="product-number__sold">
                                                    {detailProduct.sold} đã bán
                                                </div>
                                            </div>
                                            <div className="product-origin">
                                                <span>Xuất xứ</span>
                                                <span>
                                                    {detailProduct.origin}
                                                </span>
                                            </div>
                                            {detailProduct.discount !== 0 &&
                                                detailProduct.discount !==
                                                    null && (
                                                    <div className="product-sale">
                                                        <div className="product-sale__precent">
                                                            {
                                                                detailProduct.discount
                                                            }{' '}
                                                            %
                                                        </div>
                                                        <div className="product-sale__text">
                                                            GIẢM
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <h3 className="slogan">
                            <VolunteerActivismIcon />
                            <span>
                                Boby & Nina Pet Shop cam kết cung cấp thú cưng
                                có nguồn gốc rõ ràng và các dịch vụ chăm sóc thú
                                cưng chuyên nghiệp và ân cần
                            </span>
                        </h3>
                    </div>
                    {productsFilterSlug.length > 0 && (
                        <div className="related-product">
                            <h2 className="related-product__heading">
                                Có thể bạn quan tâm
                            </h2>
                        </div>
                    )}
                    {productsFilterSlug.length > 0 &&
                    productsFilterSlug.length < 4 ? (
                        <div className="related-product__list">
                            {productsFilterSlug.map((product) => (
                                <div
                                    className="related-product__item"
                                    key={product._id}
                                >
                                    <ProductItem
                                        callbackFn={callbackFn}
                                        product={product}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12} className="detail-product__list">
                                <Slider {...settings}>
                                    {productsFilterSlug.map((product) => (
                                        <Grid
                                            item
                                            xs={12}
                                            ls={6}
                                            sm={3}
                                            key={product._id}
                                        >
                                            <div className="detail-product__item">
                                                <ProductItem
                                                    product={product}
                                                    callbackFn={callbackFn}
                                                />
                                            </div>
                                        </Grid>
                                    ))}
                                </Slider>
                            </Grid>
                        </Grid>
                    )}
                    <div className="detail-product__actions-footer">
                        <Button
                            className="detail-product__actions-item"
                            fullWidth
                            success
                            iconLeft={<ShoppingCartCheckoutIcon />}
                            onClick={() => handleAddToCart(detailProduct)}
                        >
                            Thêm giỏ hàng
                        </Button>
                        <Button
                            className="detail-product__actions-item"
                            fullWidth
                            primary
                            onClick={() => handleToPayments(detailProduct)}
                        >
                            Mua ngay
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailProduct
