import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import ProductItem from '../ProductItem'
import ProductService from '../../../services/ProductService'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './style.scss'

function SliderProducts() {
    const [products, setProducts] = useState([])
    const [reloadPage, setReloadPage] = useState(false)
    const productsService = ProductService()

    const settings = {
        lazyLoad: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2500,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    autoplay: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    autoplay: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    autoplay: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    useEffect(() => {
        const getListProducts = async () => {
            try {
                const { data } = await productsService.getProducts()
                setProducts(data)
                setReloadPage(false)
            } catch (error) {
                console.log(error)
            }
        }
        getListProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadPage])

    const callbackFn = (childData) => {
        setReloadPage(childData)
    }

    return (
        <section className="slider-products">
            <div className="slider-products__header">
                <h3 className="slider-products__heading">Sản phẩm tiêu biểu</h3>
                <Link to="/products">
                    <Button variant="contained" endIcon={<SendIcon />}>
                        Toàn bộ sản phẩm
                    </Button>
                </Link>
            </div>
            <div
                className="sliders-products__wrapper"
                style={{ width: '100%' }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} className="slider-list">
                        <Slider {...settings}>
                            {products.map((product) => (
                                <Grid
                                    item
                                    xs={12}
                                    ls={6}
                                    sm={3}
                                    key={product._id}
                                >
                                    <div className="slider-products__item">
                                        <ProductItem
                                            callbackFn={callbackFn}
                                            product={product}
                                        />
                                    </div>
                                </Grid>
                            ))}
                        </Slider>
                    </Grid>
                </Grid>
            </div>
        </section>
    )
}

export default SliderProducts
