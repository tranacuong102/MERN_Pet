import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import MenuItem from '../../widgets/MenuItem'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { SYSTEM_MENU_ITEMS } from '../../../utils/FakeData'
import { LIST_PATH } from '../../../routes'

import './style.scss'

const defaultFn = () => {}

function Menu({
    removeAuthInfo,
    removeAccessToken,
    removeCartInfo,
    children,
    onChange = defaultFn,
}) {
    const navigate = useNavigate()
    const [subTitleMenu, setSubTitleMenu] = useState('')
    const [pageMenu, setPageMenu] = useState([
        {
            data: SYSTEM_MENU_ITEMS,
        },
    ])

    const currentPageMenu = pageMenu[pageMenu.length - 1]

    const onLogout = async () => {
        await removeAuthInfo()
        await removeAccessToken()
        await removeCartInfo()
        await localStorage.removeItem('@currentProduct')
        navigate(LIST_PATH.HOME)
    }

    const renderItem = () => {
        return currentPageMenu.data.map((item, index) => {
            const isParent = !!item.childs
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setPageMenu((prev) => [...prev, item.childs])
                            setSubTitleMenu(item.childs.title)
                        } else if (item.title === 'Đăng xuất') {
                            onLogout()
                        }
                    }}
                />
            )
        })
    }

    return (
        <div className="header-menu">
            <Tippy
                offset={[23, 7]}
                delay={[0, 700]}
                placement="bottom-end"
                trigger="mouseenter focus click"
                interactive
                onHide={() => {
                    if (pageMenu.length > 1) {
                        setPageMenu((prev) => prev.slice(0, prev.length - 1))
                    } else {
                        setPageMenu((prev) => prev)
                    }
                }}
                render={(attrs) => (
                    <div className="header-menu__list" tabIndex="-1" {...attrs}>
                        <div>
                            {pageMenu.length > 1 && (
                                <div className="header-menu__sub-title">
                                    <ChevronLeftIcon
                                        className="header-menu__back"
                                        onClick={() =>
                                            setPageMenu((prev) =>
                                                prev.slice(0, prev.length - 1)
                                            )
                                        }
                                    />

                                    {subTitleMenu}
                                </div>
                            )}
                            {renderItem()}
                        </div>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    )
}

export default Menu
