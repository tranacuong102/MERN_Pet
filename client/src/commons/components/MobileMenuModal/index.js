import Logo from '../../../assets/images/logo.png'
import CategoryIcon from '@mui/icons-material/Category'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import FacebookIcon from '@mui/icons-material/Facebook'
import CloseIcon from '@mui/icons-material/Close'
import Image from '../../widgets/Image'
import { getCurrentUser } from '../../../models/User'
import Button from '../../widgets/Button'
import LogoutIcon from '@mui/icons-material/Logout'
import classNames from 'classnames/bind'
import styles from './style.scss'
const cx = classNames.bind(styles)

const MobileMenuModal = ({ open, setOpen }) => {
    const currentUser = getCurrentUser()

    const classes = cx('modal-mobile', {
        open,
    })

    return (
        <div className={classes}>
            <div className="modal-mobile__header">
                <div className="modal-mobile__close">
                    <CloseIcon
                        onClick={() => setOpen(false)}
                        className="modal-mobile__close-icon"
                    />
                </div>
                <div className="modal-mobile__logo">
                    <Image
                        src={Logo}
                        alt=""
                        className="modal-mobile__logo-img"
                    />
                </div>
            </div>
            <div className="modal-mobile__menu">
                <ul className="modal-mobile__list">
                    <li className="modal-mobile__item">
                        <Button
                            to="/login"
                            fullWidth
                            className="modal-mobile__item-link"
                            iconLeft={<AccountCircleIcon />}
                        >
                            {currentUser && currentUser
                                ? 'Trang cá nhân'
                                : 'Đăng nhập / Đăng ký'}
                        </Button>
                    </li>
                    <li className="modal-mobile__item">
                        <Button
                            to="/products"
                            fullWidth
                            className="modal-mobile__item-link"
                            iconLeft={<CategoryIcon />}
                        >
                            Sản phẩm
                        </Button>
                    </li>
                    <li className="modal-mobile__item">
                        <Button
                            to="/posts"
                            fullWidth
                            className="modal-mobile__item-link"
                            iconLeft={<LocalOfferIcon />}
                        >
                            Khuyến mại
                        </Button>
                    </li>
                    <li className="modal-mobile__item">
                        <Button
                            fullWidth
                            className="modal-mobile__item-link"
                            iconLeft={<AttachMoneyIcon />}
                        >
                            Nạp tiền
                        </Button>
                    </li>
                    <li className="modal-mobile__item">
                        <Button
                            fullWidth
                            className="modal-mobile__item-link"
                            iconLeft={<ThumbUpAltIcon />}
                        >
                            Hỗ trợ
                        </Button>
                    </li>
                    <li className="modal-mobile__item">
                        <Button
                            fullWidth
                            className="modal-mobile__item-link"
                            iconLeft={<FacebookIcon />}
                        >
                            Fanpage
                        </Button>
                    </li>
                    {currentUser && currentUser ? (
                        <li className="modal-mobile__item">
                            <Button
                                fullWidth
                                className="modal-mobile__item-link logout"
                                iconLeft={<LogoutIcon />}
                            >
                                Đăng xuất
                            </Button>
                        </li>
                    ) : undefined}
                </ul>
            </div>
        </div>
    )
}

export default MobileMenuModal
