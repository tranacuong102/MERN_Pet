import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'

import Sidebar from '../../commons/components/Sidebar'
import Filters from '../../commons/components/Filters'
import ProductItem from '../../commons/components/ProductItem'
import Header from '../../commons/components/Header'
import ProductService from '../../services/ProductService'

import { MyContexts } from '../../contexts/MyContexts'
import Footer from '../../commons/components/Footer'

import '../../styles/pages/Products.scss'

function Products() {
    const [products, setProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [reloadPage, setReloadPage] = useState(false)
    const productsService = ProductService()

    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = MyContexts()
    const { type, sort } = state

    // Get Products & Filter - Sort - Pagination
    useEffect(() => {
        if (type === 'all') {
            if (sort === '-createdAt') {
                const getProducts = async () => {
                    try {
                        const { data, totalCount } =
                            await productsService.getProducts()
                        setProducts(data)
                        setTotalProducts(totalCount)
                        setReloadPage(false)
                    } catch (error) {
                        console.log(error)
                    }
                }
                getProducts()
            } else {
                const getProductsBySort = async () => {
                    try {
                        const { data, totalCount } =
                            await productsService.getProductsBySort()
                        setProducts(data)
                        setTotalProducts(totalCount)
                        setReloadPage(false)
                    } catch (error) {
                        console.log(error)
                    }
                }
                getProductsBySort()
            }
        } else {
            const getProductsByType = async () => {
                try {
                    const { data, totalCount } =
                        await productsService.getProductsByType()
                    setProducts(data)
                    setTotalProducts(totalCount)
                    setReloadPage(false)
                } catch (error) {
                    return
                }
            }
            getProductsByType()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, reloadPage])

    const callbackFn = (childData) => {
        setReloadPage(childData)
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <div className="main-body">
                    <div className="products-main">
                        <Grid container spacing={2}>
                            <Grid item md={2} className="products-sidebar">
                                <Sidebar />
                            </Grid>
                            <Grid item sm={12} md={10}>
                                <Filters totalProducts={totalProducts} />
                                <div
                                    className="product-content"
                                    style={{ marginTop: '14px' }}
                                >
                                    <Grid container spacing={2}>
                                        {products.map((product) => (
                                            <Grid
                                                item
                                                xs={12}
                                                ls={6}
                                                sm={6}
                                                md={3}
                                                key={product._id}
                                            >
                                                <ProductItem
                                                    callbackFn={callbackFn}
                                                    product={product}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Products
