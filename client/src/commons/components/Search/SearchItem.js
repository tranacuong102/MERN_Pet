import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LIST_PATH } from '../../../routes'
import Button from '../../widgets/Button'

const SearchItem = (product) => {
    const navigate = useNavigate()
    const handleNavigateDetailProduct = (slug) => {
        navigate(`${LIST_PATH.PRODUCTS}/${slug}`)
    }

    return (
        <div
            className="search-product"
            onClick={() => handleNavigateDetailProduct(product.product.slug)}
        >
            <img src={product.product.images} alt="" width={100} />
            <div className="search-product__info">
                <div className="search-product__info-name">
                    {product.product.title}
                </div>
                <div className="search-product__info-price">
                    {product.product.price.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </div>
            </div>
            <Button primary className="search-product__detail">
                Xem ngay
            </Button>
        </div>
    )
}

export default SearchItem
