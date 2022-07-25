import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import { LoadingButton } from '@mui/lab'
import { getCurrentUser } from '../../models/User'
import CategoryService from '../../services/CategoryService'
import Modal from '../../commons/widgets/Modal'

import '../../styles/pages/CreateCategory.scss'
import { LIST_PATH } from '../../routes'

function CreateCategory() {
    const navigate = useNavigate()
    const currentUser = getCurrentUser()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [reloadPage, setReloadPage] = useState(false)
    const [open, setOpen] = useState(false)
    const [onEdit, setOnEdit] = useState(false)
    const [nameCategory, setNameCategory] = useState('')
    const [idCategory, setIdCategory] = useState('')
    const inputRef = useRef()

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
                setReloadPage(false)
            } catch (error) {
                console.log(error)
            }
        }
        getCategoriesData()
    }, [reloadPage])

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
        },
    })

    const onSubmit = async (titleCategory) => {
        try {
            setLoading(true)
            if (onEdit) {
                await CategoryService.editCategory(idCategory, titleCategory)
            } else {
                await CategoryService.addCategory(titleCategory)
            }
            setReloadPage(true)
            setOnEdit(false)
            setLoading(false)
            reset()
        } catch (error) {
            setLoading(false)
        }
    }

    // UPDATE
    const handleClickUpdate = (name, id) => {
        setOnEdit(true)
        setNameCategory(name)
        setIdCategory(id)
        inputRef.current.focus()
    }

    // HANDLE MODALS
    const handleClickOpenModal = (name, id) => {
        setOpen(true)
        setNameCategory(name)
        setIdCategory(id)
    }

    // DELETE
    const handleDelete = async () => {
        try {
            setLoading(true)
            await CategoryService.deleteCategory(idCategory)
            setOpen(false)
            setLoading(false)
            setReloadPage(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="create-category">
            <div className="create-category__wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        className="category-form__item"
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <TextField
                                label="Tên danh mục *"
                                variant="outlined"
                                size="small"
                                inputRef={inputRef}
                                {...field}
                            />
                        )}
                    />

                    <LoadingButton
                        className="category-form__submit"
                        variant="contained"
                        color="success"
                        type="submit"
                        loading={loading}
                    >
                        {onEdit ? 'Cập nhật' : 'Thêm danh mục'}
                    </LoadingButton>
                    {onEdit && (
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginLeft: '20px' }}
                            onClick={() => setOnEdit(false)}
                        >
                            Hủy cập nhật
                        </Button>
                    )}
                </form>
            </div>

            <div className="category-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên danh mục</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Chỉnh sửa</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>
                                    {category.createdAt
                                        .slice(0, 10)
                                        .split('-')
                                        .reverse()
                                        .join('/')}
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        endIcon={<SettingsSuggestIcon />}
                                        onClick={() =>
                                            handleClickUpdate(
                                                category.name,
                                                category._id
                                            )
                                        }
                                    ></Button>
                                </td>
                                <td>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        endIcon={<DeleteIcon />}
                                        onClick={() =>
                                            handleClickOpenModal(
                                                category.name,
                                                category._id
                                            )
                                        }
                                    ></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {open && (
                <Modal
                    open={open}
                    loading={loading}
                    handleDelete={handleDelete}
                    handleClose={handleClose}
                >
                    {` DANH MỤC: ${nameCategory}`}
                </Modal>
            )}
        </div>
    )
}
export default CreateCategory
