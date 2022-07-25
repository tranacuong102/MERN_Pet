import Button from '../Button'

import classNames from 'classnames/bind'
import styles from './style.scss'
const cx = classNames.bind(styles)
function MenuItem({ data, onClick }) {
    const classes = cx('header-menu__item', {
        separate: data.separate,
    })
    return (
        <Button
            className={classes}
            fullWidth
            to={data.to}
            iconLeft={data.icon}
            onClick={onClick}
        >
            {data.title}
        </Button>
    )
}

export default MenuItem
