import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import UploadService from '../../services/UploadService'
import TextField from '@mui/material/TextField'
import ClearIcon from '@mui/icons-material/Clear'
import { LoadingButton } from '@mui/lab'
import { getCurrentUser } from '../../models/User'
import { LIST_PATH } from '../../routes'
import AnimationLoading from '../../commons/widgets/AnimationLoading'
import { Button } from '@mui/material'
import PostService from '../../services/PostService'
import Image from '../../commons/widgets/Image'
import useStore from '../../stores/hooks/useStore'
import { setEditPost, setValueDefaultPost } from '../../stores/context/actions'

import '../../styles/pages/CreatePost.scss'

const CreatePost = () => {
    const navigate = useNavigate()
    const currentUser = getCurrentUser()
    const [previewImage, setPreviewImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showImageDefault, setShowImageDefault] = useState(true)
    const [publicId, setPublicId] = useState('')
    const [images, setImages] = useState('')

    const [state, dispatch] = useStore()

    const { editPost, post } = state

    // Check admin, nếu ko đúng admin đưa người dùng về Home page
    useEffect(() => {
        if (currentUser === null || currentUser.roles !== 2) {
            navigate(LIST_PATH.HOME)
        }
    }, [currentUser, navigate])

    const handleUpload = async (event) => {
        event.preventDefault()
        try {
            const file = event.target.files[0]

            file.preview = URL.createObjectURL(file)
            setPreviewImage(file)
            event.target.value = null

            if (!file) return alert('Vui lòng chọn hình ảnh cho bài viết.')

            if (file.size > 1024 * 1024 * 5)
                return alert('Dung lượng ảnh quá lớn')

            if (
                file.type !== 'image/jpg' &&
                file.type !== 'image/jpeg' &&
                file.type !== 'image/png'
            )
                return alert('Định dạng file không đúng.')

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)

            const { public_id, url } = await UploadService.uploadImage(formData)

            setLoading(false)
            setPublicId(public_id)
            setImages(url)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    // Clear image on Cloudinary
    const handleClearImage = async () => {
        setPreviewImage(false)
        try {
            if (editPost) {
                setShowImageDefault(false)
            } else {
                setLoading(true)
                await UploadService.destroyImage({ public_id: publicId })
                setLoading(false)
                setImages(false)
            }
        } catch (error) {
            alert(error.response.message)
        }
    }

    const styleUpload = {
        display: `${
            editPost && showImageDefault
                ? previewImage
                    ? 'none'
                    : 'block'
                : previewImage
                ? 'block'
                : 'none'
        }`,
    }

    const { control, handleSubmit, reset } = useForm({
        defaultValues: { ...post },
    })

    const onSubmit = async (dataPost) => {
        try {
            setLoading(true)
            if (editPost) {
                await PostService.editPost(post.post_id, {
                    ...dataPost,
                    images: images || post.images,
                })
                dispatch(
                    setValueDefaultPost({
                        title: '',
                        images: '',
                        description: '',
                    })
                )
            } else {
                await PostService.addPost({
                    ...dataPost,
                    images,
                })
            }
            reset({
                title: '',
                images: '',
                description: '',
            })
            setLoading(false)
            setPreviewImage(false)
            setShowImageDefault(false)
            dispatch(setEditPost(false))
        } catch (error) {
            setLoading(false)
        }
    }

    const handleCancelUpdate = () => {
        dispatch(setEditPost(false))
        reset({
            title: '',
            description: '',
            images: '',
        })
    }

    return (
        <div className="posts">
            <div className="create-post">
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <div className="create-post__upload">
                            <h3 className="upload-heading">
                                Thêm hình ảnh mô tả cho bài viết
                            </h3>
                            <div className="upload-content">
                                <input
                                    type="file"
                                    name="file"
                                    id="file_upload"
                                    onChange={handleUpload}
                                />
                                {loading ? (
                                    <div id="file_img">
                                        {<AnimationLoading />}
                                    </div>
                                ) : (
                                    <div id="file_img" style={styleUpload}>
                                        {editPost && showImageDefault ? (
                                            <Image src={post.images} alt="" />
                                        ) : (
                                            <img
                                                src={previewImage.preview}
                                                alt=""
                                            />
                                        )}
                                        <span onClick={handleClearImage}>
                                            <ClearIcon />
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="create-post__content">
                            <h3 className="create-post__heading">
                                Thông tin của bài viết
                            </h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    className="post-form__item"
                                    control={control}
                                    name="title"
                                    render={({ field }) => (
                                        <TextField
                                            fullWidth
                                            label="Tiêu đề"
                                            variant="outlined"
                                            required
                                            size="small"
                                            {...field}
                                        />
                                    )}
                                />

                                <Controller
                                    className="post-form__item"
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <TextField
                                            required
                                            fullWidth
                                            label="Mô tả"
                                            variant="outlined"
                                            multiline
                                            rows={8}
                                            size="small"
                                            {...field}
                                        />
                                    )}
                                />

                                <div className="mt-12 t-center">
                                    <LoadingButton
                                        className="post-form__submit"
                                        variant="contained"
                                        type="submit"
                                        loading={loading}
                                    >
                                        {editPost
                                            ? 'Cập nhật'
                                            : 'Thêm bài viết'}
                                    </LoadingButton>
                                    {editPost && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={{ marginLeft: '20px' }}
                                            onClick={handleCancelUpdate}
                                            className="btn__cancel-update"
                                        >
                                            Hủy cập nhật
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default CreatePost
