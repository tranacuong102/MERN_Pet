import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {
    setEditProduct,
    setValueProduct,
} from '../../../stores/context/actions'
import useStore from '../../../stores/hooks/useStore'

import './style.scss'

function AdminDashboard() {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useStore()
    const handleCreateProduct = () => {
        dispatch(setEditProduct(false))
        dispatch(
            setValueProduct({
                title: '',
                price: '',
                discount: 0,
                quantity: '',
                origin: '',
                description: '',
                images: '',
                category: '',
            })
        )
    }

    return (
        <div className="admin-dashboard">
            <div className="container">
                <div className="admin-wrapper">
                    <div className="admin-text">QUẢN TRỊ VIÊN</div>
                    <div className="admin-actions">
                        <Grid container>
                            <Grid item xs={12} sm={6} md={3}>
                                <Link to="/create-product">
                                    <Button
                                        className="admin-actions__item"
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        onClick={handleCreateProduct}
                                    >
                                        Tạo sản phẩm mới
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Link to="/create-category">
                                    <Button
                                        className="admin-actions__item"
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<CreateNewFolderIcon />}
                                    >
                                        Tạo danh mục mới
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Link to={'/create-post'}>
                                    <Button
                                        className="admin-actions__item"
                                        variant="contained"
                                        color="success"
                                        startIcon={<BorderColorIcon />}
                                    >
                                        Tạo thông báo mới
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Link to="/deleted-products">
                                    <Button
                                        className="admin-actions__item"
                                        variant="outlined"
                                        color="error"
                                        endIcon={<DeleteIcon />}
                                    >
                                        Sản phẩm đã xóa
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
