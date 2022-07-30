import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Image from '../../commons/widgets/Image'
import Header from '../../commons/components/Header'
import Footer from '../../commons/components/Footer'
import PostService from '../../services/PostService'
import useStore from '../../stores/hooks/useStore'
import Button from '../../commons/widgets/Button'
import { setEditPost, setValueDefaultPost } from '../../stores/context/actions'
import { useNavigate } from 'react-router-dom'
import { LIST_PATH } from '../../routes'
import { getCurrentUser } from '../../models/User'
import Modal from '../../commons/widgets/Modal'

import '../../styles/pages/Posts.scss'

function Posts() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [reloadPage, setReloadPage] = useState(false)
    const [open, setOpen] = useState(false)
    const [idPost, setIdPost] = useState('')
    const [titlePost, setTitlePost] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useStore()

    const currentUser = getCurrentUser()
    // eslint-disable-next-line no-unused-vars
    const [isAdmin, setIsAdmin] = useState(() => {
        if (currentUser === null || currentUser.roles !== 2) {
            return false
        } else {
            return true
        }
    })

    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data } = await PostService.getPosts()
                setPosts(data)
                setReloadPage(false)
            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
    }, [reloadPage])

    const [first, ...newPosts] = posts

    const handleUpdatePost = (post) => {
        navigate(LIST_PATH.CREATE_POST)
        dispatch(setEditPost(true))
        dispatch(
            setValueDefaultPost({
                post_id: post._id,
                title: post.title,
                description: post.description,
                images: post.images,
            })
        )
    }

    // HANDLE MODALS
    const handleClickOpenModal = (id, title) => {
        setIdPost(id)
        setTitlePost(title)
        setOpen(true)
    }
    // DELETE POST
    const handleDelete = async () => {
        try {
            setLoading(true)
            await PostService.deletePost(idPost)
            setOpen(false)
            setLoading(false)
            setReloadPage(true)
        } catch (error) {
            return
        }
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <div className="main-body">
                    <div className="posts-main">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <div className="posts-main__hightlight">
                                    <h2 className="posts-main__title posts-main__title--first">
                                        Ưu đãi mới nhất
                                    </h2>
                                    <div className="posts__item">
                                        <Image
                                            src={first && first.images}
                                            alt=""
                                            className="posts__item-img"
                                        ></Image>
                                        <div className="posts__item-content">
                                            <h3 className="posts__item-heading">
                                                {first && first.title}
                                            </h3>
                                            <p className="posts__item-description">
                                                {first && first.description}
                                            </p>
                                            <p className="posts__item-date">
                                                <span>Ngày đăng: </span>
                                                {first &&
                                                    first.createdAt
                                                        .slice(0, 10)
                                                        .split('-')
                                                        .reverse()
                                                        .join('/')}
                                            </p>
                                        </div>
                                        {isAdmin && (
                                            <div className="posts__item-actions">
                                                <Button
                                                    primary
                                                    onClick={() =>
                                                        handleClickOpenModal(
                                                            first._id,
                                                            first.title
                                                        )
                                                    }
                                                >
                                                    DELETE
                                                </Button>
                                                <Button
                                                    success
                                                    onClick={() =>
                                                        handleUpdatePost(first)
                                                    }
                                                >
                                                    UPDATE
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <h2 className="posts-main__title posts-main__title--second">
                                    Danh sách các chương trình khuyến mại
                                </h2>
                                <Grid container spacing={2}>
                                    {newPosts.map((post) => (
                                        <Grid item xs={6} key={post._id}>
                                            <div className="posts__item">
                                                <Image
                                                    src={post.images}
                                                    alt=""
                                                    className="posts__item-img"
                                                ></Image>
                                                <div className="posts__item-content">
                                                    <h3 className="posts__item-heading">
                                                        {post.title}
                                                    </h3>
                                                    <p className="posts__item-description">
                                                        {post.description}
                                                    </p>
                                                    <p className="posts__item-date">
                                                        <span>Ngày đăng: </span>
                                                        {post.createdAt
                                                            .slice(0, 10)
                                                            .split('-')
                                                            .reverse()
                                                            .join('/')}
                                                    </p>
                                                </div>
                                                {isAdmin && (
                                                    <div className="posts__item-actions">
                                                        <Button
                                                            primary
                                                            onClick={() =>
                                                                handleClickOpenModal(
                                                                    post._id,
                                                                    post.title
                                                                )
                                                            }
                                                        >
                                                            DELETE
                                                        </Button>
                                                        <Button
                                                            success
                                                            onClick={() =>
                                                                handleUpdatePost(
                                                                    post
                                                                )
                                                            }
                                                        >
                                                            UPDATE
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    {open && (
                        <Modal
                            open={open}
                            loading={loading}
                            handleDelete={handleDelete}
                            handleClose={handleClose}
                        >
                            {` DANH MỤC: ${titlePost}`}
                        </Modal>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Posts
