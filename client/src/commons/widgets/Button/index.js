import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './style.scss'
const cx = classNames.bind(styles)

function Button({
    to,
    href,
    onClick,
    disable,
    primary,
    secondary,
    success,
    className,
    fullWidth,
    iconLeft,
    children,
    ...passProps
}) {
    let ComponentStyle = 'button'
    const props = {
        onClick,
        ...passProps,
    }
    if (to) {
        props.to = to
        ComponentStyle = Link
    } else if (href) {
        props.href = href
        ComponentStyle = 'a'
    }
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }
    const classes = cx('btn', {
        fullWidth,
        disable,
        primary,
        success,
        secondary,
        [className]: className,
    })

    return (
        <ComponentStyle className={classes} {...props}>
            {iconLeft && (
                <span className={cx('btn__icon-left')}>{iconLeft}</span>
            )}
            <span>{children}</span>
        </ComponentStyle>
    )
}

export default Button
