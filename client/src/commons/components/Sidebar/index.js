import { useEffect, useState } from 'react'

import CategoryService from '../../../services/CategoryService'
import ListIcon from '@mui/icons-material/List'
import Button from '../../widgets/Button'
import { setPage, setSort, setType } from '../../../contexts/actions'
import { MyContexts } from '../../../contexts/MyContexts'
import './style.scss'

function Sidebar() {
    const [categories, setCategories] = useState([])
    const [state, dispatch] = MyContexts()
    const { type } = state

    useEffect(() => {
        ;(async function () {
            try {
                const { data } = await CategoryService.getCategories()
                setCategories(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const handleChangeInitState = (type) => {
        dispatch(setType(type))
        dispatch(setSort('-createdAt'))
        dispatch(setPage(1))
    }

    return (
        <div className="sidebar">
            <h3 className="sidebar-header">
                <ListIcon className="category-menu-icon" />
                Danh mục
            </h3>
            <div className="category-list">
                <Button
                    fullWidth
                    onClick={() => handleChangeInitState('all')}
                    className="category-item"
                    style={type === 'all' ? { color: 'red' } : {}}
                >
                    Tất cả sản phẩm
                </Button>
                {categories.map((category) => (
                    <Button
                        fullWidth
                        key={category._id}
                        className="category-item"
                        onClick={() => handleChangeInitState(category._id)}
                        style={type === category._id ? { color: 'red' } : {}}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
