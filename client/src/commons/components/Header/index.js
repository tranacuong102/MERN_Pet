import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from '../../../assets/images/logo.png'
import { useAuthInfo } from '../../../stores/hooks/useAuthInfo'
import { useAccessToken } from '../../../stores/hooks/useAccessToken'
import { useCartInfo } from '../../../stores/hooks/useCartInfo'
import { getCurrentUser } from '../../../models/User'
import Search from '../Search'
import DefaultAvatar from '../../../assets/images/DefaultAvatar.jpg'
import UserControl from '../UserMenu'
import Image from '../../widgets/Image'
import Button from '../../widgets/Button'
import Cart from '../Cart'
import Notification from '../Notification'
import { SearchIcon } from '../../widgets/Icons'
import MobileMenuModal from '../MobileMenuModal'

import './style.scss'

function Header() {
    const { removeAuthInfo } = useAuthInfo()
    const { removeAccessToken } = useAccessToken()
    const { removeCartInfo } = useCartInfo()
    const currentUser = getCurrentUser()
    const [open, setOpen] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [isAdmin, setIsAdmin] = useState(() => {
        return currentUser && currentUser.roles === 2
    })

    const handleOpenSearch = () => {
        setOpenSearch(true)
    }

    return (
        <header className="header">
            <div className="header-nav">
                <div className="container">
                    <div className="header-nav__wrapper">
                        <ul className="header-nav__list">
                            <li className="header-nav__item mr-40">
                                <Button className="header-nav__link" to="/">
                                    Trang chủ
                                </Button>
                            </li>
                            <li className="header-nav__item mr-40">
                                <Button
                                    className="header-nav__link"
                                    to="/products"
                                >
                                    Sản phẩm
                                </Button>
                            </li>
                            <li className="header-nav__item mr-40">
                                <Button
                                    to="/posts"
                                    className="header-nav__link"
                                >
                                    Khuyến mại
                                </Button>
                            </li>
                            <li className="header-nav__item mr-40">
                                <Button className="header-nav__link" to="/">
                                    Nạp tiền
                                </Button>
                            </li>
                        </ul>

                        <ul className="header-nav__list">
                            <li className="header-nav__item mr-40">
                                <Button className="header-nav__link">
                                    Hỗ trợ
                                </Button>
                            </li>
                            <li className="header-nav__item">
                                <Button
                                    className="header-nav__link"
                                    href="http://facebook.com"
                                >
                                    Fanpage
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* HEADER NAVBAR */}

            <div className="container">
                <div className="header-wrapper">
                    <div className="header-menu__mobile">
                        <MenuIcon onClick={() => setOpen(true)} />
                        <MobileMenuModal open={open} setOpen={setOpen} />
                    </div>

                    <div
                        className="header-search__icon-mobile"
                        onClick={handleOpenSearch}
                    >
                        <SearchIcon />
                    </div>

                    {/* HEADER LOGO */}
                    <div className="header-logo">
                        <Link to="/" className="header-logo__link">
                            {isAdmin ? (
                                <div className="header-logo__admin mt-12">
                                    ADMIN
                                </div>
                            ) : (
                                <img
                                    src={Logo}
                                    alt="Shopee Logo"
                                    className="header-logo__img"
                                />
                            )}
                        </Link>
                    </div>

                    {/* HEADER SEARCH */}
                    <div className="header-search">
                        <Search
                            openSearch={openSearch}
                            setOpenSearch={setOpenSearch}
                        />
                    </div>

                    {/* HEADER HISTORY */}
                    <div className="header-history__wrapper">
                        <Tippy
                            offset={[0, 1]}
                            placement="bottom"
                            delay={[0, 300]}
                            trigger="mouseenter focus click"
                            animation={false}
                            interactive
                            render={(attrs) => (
                                <div
                                    className="header-tippy__wrapper tippy-history"
                                    tabIndex="-1"
                                    {...attrs}
                                >
                                    {isAdmin
                                        ? 'Xem toàn bộ giao dịch'
                                        : 'Lịch sử giao dịch'}
                                </div>
                            )}
                        >
                            <div className="header-history">
                                <Link to="/history">
                                    <HistoryEduIcon className="header-actions__icon" />
                                </Link>
                            </div>
                        </Tippy>
                    </div>

                    {/* HEADER NOTIFICATION */}
                    <div className="header-notification">
                        <Notification />
                    </div>

                    {/* HEADER CART */}
                    <div className="header-cart">
                        <Cart />
                    </div>

                    {/* HEADER AUTH */}
                    {currentUser ? (
                        <UserControl
                            removeAuthInfo={removeAuthInfo}
                            removeAccessToken={removeAccessToken}
                            removeCartInfo={removeCartInfo}
                        >
                            <div className="header-user">
                                <div className="header-user__avatar">
                                    <Image
                                        src={
                                            currentUser.avatar
                                                ? currentUser.avatar
                                                : DefaultAvatar
                                        }
                                        alt=""
                                        fallBack={DefaultAvatar}
                                        className="header-user__avatar-img"
                                    />
                                </div>
                            </div>
                        </UserControl>
                    ) : (
                        <div className="header-auth">
                            <Link
                                to="/login"
                                className="header-auth__btn-login"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                to="/register"
                                className="header-auth__btn-register"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
