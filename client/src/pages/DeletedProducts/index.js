import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import RestoreIcon from '@mui/icons-material/Restore'
import { getCurrentUser } from '../../models/User'
import Modal from '../../commons/widgets/Modal'
import ProductService from '../../services/ProductService'
import { LIST_PATH } from '../../routes'

import '../../styles/pages/DeletedProducts.scss'

function DeletedProducts() {
    const currentUser = getCurrentUser()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [reloadPage, setReloadPage] = useState(false)
    const [open, setOpen] = useState(false)
    const [nameProduct, setNameProduct] = useState('')
    const [idProduct, setIdProduct] = useState('')
    const navigate = useNavigate()
    const productsService = ProductService()

    // Check admin, nếu ko đúng admin đưa người dùng về Home page
    useEffect(() => {
        if (currentUser === null || currentUser.roles !== 2) {
            navigate(LIST_PATH.HOME)
        }
    }, [currentUser, navigate])

    useEffect(() => {
        const getDeletedProducts = async () => {
            try {
                const { data } = await productsService.getDeletedProducts()
                setProducts(data)
                setReloadPage(false)
            } catch (error) {
                console.log(error)
            }
        }
        getDeletedProducts()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadPage])

    // HANDLE MODALS
    const handleClickOpenModal = (id, title) => {
        setOpen(true)
        setNameProduct(title)
        setIdProduct(id)
    }

    const handleRestoreProduct = async (id) => {
        try {
            setLoading(true)
            await productsService.restoreProduct(id)
            setLoading(false)
            setOpen(false)
            setReloadPage(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDestroyProduct = async () => {
        try {
            setLoading(true)
            await productsService.destroyProduct(idProduct)
            setLoading(false)
            setOpen(false)
            setReloadPage(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="products-deleted mt-12">
            <h3
                className="products-deleted__heading t-center"
                style={{ color: 'red', paddingTop: '12px' }}
            >
                DANH SÁCH SẢN PHẨM ĐÃ XÓA
            </h3>
            <div className="products-deleted__table mt-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Ngày xóa</th>
                            <th scope="col">Giá bán</th>
                            <th scope="col">Xuất xứ</th>
                            <th scope="col">Khôi phục</th>
                            <th scope="col">Xóa vĩnh viễn</th>
                        </tr>
                    </thead>
                    {products.map((product, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{product.title}</td>
                                <td>{product.deletedAt}</td>
                                <td>{product.price}</td>
                                <td>{product.origin}</td>
                                <td>
                                    <Button
                                        variant="contained"
                                        endIcon={<RestoreIcon />}
                                        onClick={() =>
                                            handleRestoreProduct(product._id)
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
                                                product._id,
                                                product.title
                                            )
                                        }
                                    ></Button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                {products.length === 0 && (
                    <div className="mt-12 t-center">
                        Hiện tại không có sản phẩm nào đã bị xóa!
                    </div>
                )}
            </div>
            {open && (
                <Modal
                    title="[Cảnh báo] - Dữ liệu bị xóa không thể khôi phục lại"
                    open={open}
                    loading={loading}
                    handleDestroyProduct={handleDestroyProduct}
                    handleClose={handleClose}
                >
                    {` Sản Phẩm: ${nameProduct}`}
                </Modal>
            )}
        </div>
    )
}
export default DeletedProducts
