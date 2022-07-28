import React from 'react'
import Tippy from '@tippyjs/react'
import { CartIcon } from '../../widgets/Icons'
import CartEmpty from '../../../assets/images/empty-cart.png'
import { getCurrentUser, getCartCurrentUser } from '../../../models/User'
import Button from '../../widgets/Button'

import './style.scss'
import { Link } from 'react-router-dom'

const Cart = () => {
    const currentUser = getCurrentUser()
    const cart = getCartCurrentUser()

    return (
        <>
            <Tippy
                offset={[0, -39]}
                delay={[0, 400]}
                placement="top"
                animation={false}
                interactive
                trigger="mouseenter focus click"
                render={(attrs) => (
                    <div
                        className="header-tippy__wrapper"
                        tabIndex="-1"
                        {...attrs}
                    >
                        {currentUser ? (
                            <div className="header-cart__content">
                                {cart && cart.length > 0 ? (
                                    <>
                                        <ul className="header-cart__list">
                                            {cart &&
                                                cart.map((item) => (
                                                    <li
                                                        key={item._id}
                                                        className="header-cart__item"
                                                    >
                                                        <img
                                                            src={item.images}
                                                            alt=""
                                                        />
                                                        <div className="cart-item__info">
                                                            <h4 className="cart-item__info-name">
                                                                {item.title}
                                                            </h4>
                                                            <div className="cart-item__info-orgin">
                                                                Xuất xứ:{' '}
                                                                {item.origin}
                                                            </div>
                                                        </div>
                                                        <div className="cart-item__price">
                                                            {item.price.toLocaleString(
                                                                'vi',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'VND',
                                                                }
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                        </ul>
                                        <Button
                                            to="/cart"
                                            fullWidth
                                            primary
                                            className="btn-show-cart"
                                        >
                                            Xem toàn bộ giỏ hàng
                                        </Button>
                                    </>
                                ) : (
                                    <div className="header-cart__content--has-item">
                                        <img
                                            src={CartEmpty}
                                            alt="Giỏ hàng trống"
                                            className="header-cart__content-img"
                                        />
                                        <p className="header-cart__title">
                                            Giỏ hàng chưa có sản phẩm nào!
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="header-cart__status">
                                Bạn cần đăng nhập để xem giỏ hàng!
                            </p>
                        )}
                    </div>
                )}
            >
                <div className="header-cart__icon">
                    {cart && cart.length > 0 && (
                        <div className="header-cart__number">
                            {cart && cart.length}
                        </div>
                    )}
                    <Link to="/cart">
                        <CartIcon className="header-actions__icon" />
                    </Link>
                </div>
            </Tippy>
        </>
    )
}

export default Cart
