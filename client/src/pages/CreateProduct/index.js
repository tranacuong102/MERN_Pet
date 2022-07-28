import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { LoadingButton } from '@mui/lab'
import { Button } from '@mui/material'

import { getCurrentUser } from '../../models/User'
import { LIST_PATH } from '../../routes'
import CategoryService from '../../services/CategoryService'
import AnimationLoading from '../../commons/widgets/AnimationLoading'
import ClearIcon from '@mui/icons-material/Clear'
import UploadService from '../../services/UploadService'
import ProductService from '../../services/ProductService'
import { MyContexts } from '../../contexts/MyContexts'
import { setEditProduct } from '../../contexts/actions'

import '../../styles/pages/CreateProduct.scss'

function CreateProduct() {
    const navigate = useNavigate()
    const currentUser = getCurrentUser()
    const productsService = ProductService()
    const [categories, setCategories] = useState([])
    const [images, setImages] = useState(false)
    const [previewImage, setPreviewImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [valueCategory, setValueCategory] = useState('')
    const [publicId, setPublicId] = useState('')
    const [showImageDefault, setShowImageDefault] = useState(true)

    const [state, dispatch] = MyContexts()
    const { isEditProduct, defaultValueProduct } = state

    // Check admin, nếu ko đúng admin đưa người dùng về Home page
    useEffect(() => {
        if (currentUser === null || currentUser.roles !== 2) {
            navigate(LIST_PATH.HOME)
        }
    }, [currentUser, navigate])

    useEffect(() => {
        const getCategoriesData = async () => {
            try {
                const { data } = await CategoryService.getCategories()
                setCategories(data)
            } catch (error) {
                console.log(error)
            }
        }
        getCategoriesData()
    }, [])

    // Xóa bỏ url tạm khi thay thế images
    useEffect(() => {
        return () => {
            previewImage && URL.revokeObjectURL(previewImage.preview)
        }
    }, [previewImage])

    // upload image
    const handleUpload = async (event) => {
        event.preventDefault()
        try {
            const file = event.target.files[0]

            file.preview = URL.createObjectURL(file)
            setPreviewImage(file)
            event.target.value = null

            if (!file) return alert('Vui lòng chọn file ảnh cho sản phẩm.')

            if (file.size > 1024 * 1024 * 5)
                return alert('Kích thước ảnh quá lớn')

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
            if (isEditProduct) {
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
            isEditProduct && showImageDefault
                ? previewImage
                    ? 'none'
                    : 'block'
                : previewImage
                ? 'block'
                : 'none'
        }`,
    }

    const { control, handleSubmit, reset } = useForm({
        defaultValues: { ...defaultValueProduct },
    })

    const onSubmit = async (dataProduct) => {
        try {
            setLoading(true)
            if (isEditProduct) {
                await productsService.editProduct(
                    defaultValueProduct.product_id,
                    {
                        ...dataProduct,
                        images: images || defaultValueProduct.images,
                        category: valueCategory || defaultValueProduct.category,
                    }
                )
            } else {
                await productsService.addProduct({
                    ...dataProduct,
                    images: images,
                    category: valueCategory,
                })
            }
            reset({
                title: '',
                price: '',
                discount: 0,
                quantity: '',
                origin: '',
                description: '',
                images: '',
                category: '',
            })
            setLoading(false)
            setPreviewImage(false)
            setShowImageDefault(false)
            dispatch(setEditProduct(false))
        } catch (error) {
            setLoading(false)
        }
    }

    const handleCancelUpdate = () => {
        dispatch(setEditProduct(false))
        reset({
            title: '',
            price: '',
            discount: 0,
            quantity: '',
            origin: '',
            description: '',
            images: '',
            category: '',
        })
    }

    return (
        <div className="create-product">
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <div className="create-product__upload">
                        <h3 className="upload-heading">
                            Thêm hình ảnh cho sản phẩm
                        </h3>
                        <div className="upload-content">
                            <input
                                type="file"
                                name="file"
                                id="file_upload"
                                onChange={handleUpload}
                            />
                            {loading ? (
                                <div id="file_img">{<AnimationLoading />}</div>
                            ) : (
                                <div id="file_img" style={styleUpload}>
                                    {isEditProduct && showImageDefault ? (
                                        <img
                                            src={defaultValueProduct.images}
                                            alt=""
                                        />
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
                    <div className="create-product__content">
                        <h3 className="create-product__heading">
                            Thông tin của sản phẩm
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                control={control}
                                name="title"
                                render={({ field }) => (
                                    <TextField
                                        className="product-form__item"
                                        fullWidth
                                        label="Tên sản phẩm"
                                        variant="outlined"
                                        required
                                        size="small"
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="price"
                                render={({ field }) => (
                                    <TextField
                                        className="product-form__item"
                                        type="number"
                                        fullWidth
                                        required
                                        label="Giá bán *"
                                        variant="outlined"
                                        size="small"
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="discount"
                                render={({ field }) => (
                                    <TextField
                                        className="product-form__item"
                                        fullWidth
                                        required
                                        type="number"
                                        label="% Chiết khấu *"
                                        variant="outlined"
                                        size="small"
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="quantity"
                                render={({ field }) => (
                                    <TextField
                                        className="product-form__item"
                                        required
                                        fullWidth
                                        type="number"
                                        label="Số lượng *"
                                        variant="outlined"
                                        size="small"
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="origin"
                                render={({ field }) => (
                                    <TextField
                                        className="product-form__item"
                                        required
                                        fullWidth
                                        label="Xuất xứ *"
                                        variant="outlined"
                                        size="small"
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="description"
                                render={({ field }) => (
                                    <TextField
                                        className="product-form__item"
                                        required
                                        fullWidth
                                        type="number"
                                        label="Mô tả cho sản phẩm *"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        size="small"
                                        {...field}
                                    />
                                )}
                            />

                            <InputLabel
                                id="demo-simple-select-label"
                                className="mt-12"
                            >
                                Danh mục sản phẩm
                            </InputLabel>
                            <Select
                                className="product-form__item"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="category"
                                required
                                key={
                                    categories.length && isEditProduct
                                        ? defaultValueProduct.category
                                        : ''
                                }
                                defaultValue={
                                    categories.length && isEditProduct
                                        ? defaultValueProduct.category
                                        : ''
                                }
                                onChange={(event) =>
                                    setValueCategory(event.target.value)
                                }
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        value={category._id}
                                        key={category._id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>

                            <div className="mt-12 t-center">
                                <LoadingButton
                                    className="product-form__submit"
                                    variant="contained"
                                    type="submit"
                                    loading={loading}
                                >
                                    {isEditProduct
                                        ? 'Cập nhật'
                                        : 'Thêm sản phẩm'}
                                </LoadingButton>
                                {isEditProduct && (
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
    )
}

export default CreateProduct
