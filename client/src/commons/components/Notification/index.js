import { useState, useEffect } from 'react'
import Tippy from '@tippyjs/react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import PostService from '../../../services/PostService'
import Button from '../../widgets/Button'

import './style.scss'

const Notification = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data } = await PostService.getPosts()
                setPosts(data)
            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
    }, [])

    return (
        <>
            <Tippy
                offset={[0, -41]}
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
                        <div className="header-posts__content">
                            {posts.length > 0 ? (
                                <>
                                    <h4 className="header-posts__content-heading">
                                        Chương trình khuyến mại
                                    </h4>
                                    <ul className="header-posts__list">
                                        {posts.map((item) => (
                                            <li
                                                key={item._id}
                                                className="header-posts__item"
                                            >
                                                <img src={item.images} alt="" />
                                                <div className="posts-item__info">
                                                    <h4 className="posts-item__info-title">
                                                        {item.title}
                                                    </h4>
                                                    <p className="posts-item__info-date">
                                                        Ngày đăng:{' '}
                                                        <span>
                                                            {item.createdAt
                                                                .slice(0, 10)
                                                                .split('-')
                                                                .reverse()
                                                                .join('/')}
                                                        </span>
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        to="/posts"
                                        fullWidth
                                        primary
                                        className="btn-show-posts"
                                    >
                                        Xem tất cả các chương trình khuyến mại
                                    </Button>
                                </>
                            ) : (
                                <div className="header-posts__content--has-item">
                                    <p className="header-posts__title">
                                        Tạm thời không có chương trình khuyến
                                        mại nào
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            >
                <NotificationsNoneIcon className="header-actions__icon" />
            </Tippy>
        </>
    )
}

export default Notification
