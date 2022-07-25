import Grid from '@mui/material/Grid'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TelegramIcon from '@mui/icons-material/Telegram'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTiktok } from '@fortawesome/free-brands-svg-icons'
import Button from '../../widgets/Button'
import LicenseImg from '../../../assets/images/license_2.png'

import './style.scss'

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <div className="footer-item">
                            <img
                                src={LicenseImg}
                                alt=""
                                className="footer-item__license"
                            />
                            <p>
                                Cửa hàng thú cưng{' '}
                                <span>Boby & Nina Pet Shop</span>
                            </p>
                            <p className="footer-item__address">
                                Địa chỉ: Số 1 Trái Đất, Hệ Mặt Trời, Milky Way
                            </p>
                            <p>HOTLINE: 0979891002</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className="footer-item__rules">
                            <h2 className="footer-item__heading">Chính sách</h2>
                            <Button
                                fullWidth
                                className="footer-item__rules-item"
                            >
                                Điều khoản & Dịch vụ
                            </Button>
                            <Button
                                fullWidth
                                className="footer-item__rules-item"
                            >
                                Chính sách mua hàng
                            </Button>
                            <Button
                                fullWidth
                                className="footer-item__rules-item"
                            >
                                Chính sách hoàn tiền
                            </Button>
                            <Button
                                fullWidth
                                className="footer-item__rules-item"
                            >
                                Chăm sóc khách hàng
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className="footer-item__follow">
                            <h3 className="footer-item__heading">
                                Theo dõi chúng tôi trên các ứng dụng
                            </h3>
                            <div className="footer-item__follow-icons">
                                <FacebookIcon className="footer-item__follow-icon" />
                                <InstagramIcon className="footer-item__follow-icon" />
                                <TwitterIcon className="footer-item__follow-icon" />
                                <YouTubeIcon className="footer-item__follow-icon" />
                                <TelegramIcon className="footer-item__follow-icon" />
                                <FontAwesomeIcon
                                    className="footer-item__follow-icon"
                                    icon={faTiktok}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
