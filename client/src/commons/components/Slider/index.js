import Slider from 'react-slick'
import Grid from '@mui/material/Grid'
import { DATA_SLIDERS } from '../../../utils/FakeData'
import Voucher1 from '../../../assets/images/voucher1.jpg'
import Voucher2 from '../../../assets/images/voucher2.jpg'
import Voucher3 from '../../../assets/images/voucher3.jpg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './style.scss'

function Sliders() {
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        slidesToScroll: 1,
        initialSlide: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2500,
        cssEase: 'linear',
    }
    return (
        <div className="sliders">
            <h3 className="sliders__heading">Thông tin nổi bật</h3>
            <div className="sliders-wrapper" style={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={9} className="slider-list">
                        <Slider {...settings}>
                            {DATA_SLIDERS.map((item) => (
                                <div className="slider-item" key={item.id}>
                                    <img
                                        src={item.linkImg}
                                        alt=""
                                        width="100%"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sm={3}
                        className="sliders-voucher__wrapper"
                    >
                        <div className="sliders-voucher">
                            <div className="slider-voucher__item">
                                <img src={Voucher1} alt="" width="100%" />
                            </div>
                            <div className="slider-voucher__item">
                                <img src={Voucher2} alt="" width="100%" />
                            </div>
                            <div className="slider-voucher__item">
                                <img src={Voucher3} alt="" width="100%" />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Sliders
