import { useEffect, useState } from 'react'
import Button from '../../widgets/Button'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { MyContexts } from '../../../contexts/MyContexts'
import { setSort, setPage, setType } from '../../../contexts/actions'
import CategoryService from '../../../services/CategoryService'
import classNames from 'classnames/bind'
import styles from './style.scss'
const cx = classNames.bind(styles)

function Filters({ totalProducts }) {
    const [state, dispatch] = MyContexts()
    const [categories, setCategories] = useState([])
    const { sort, page } = state

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await CategoryService.getCategories()
                setCategories(data)
            } catch (error) {
                console.log(error)
            }
        }
        getCategories()
    }, [])

    const handleSortBySold = () => {
        dispatch(setSort('-sold'))
    }

    const handleSortByCreatedAt = () => {
        dispatch(setSort('-createdAt'))
    }

    const handleChangePrice = (value) => {
        dispatch(setSort(value))
    }

    const handlePaginationDown = () => {
        dispatch(setPage(page - 1))
    }
    const handlePaginationUp = () => {
        dispatch(setPage(page + 1))
    }

    // Mobile Change Value By Sort
    const handleChangeSort = (value) => {
        dispatch(setSort(value))
    }
    const handleChangeType = (value) => {
        dispatch(setType(value))
        dispatch(setPage(1))
    }

    return (
        <div className={cx('navigation')}>
            <div className={cx('filters')}>
                <span className={cx('filters-label')}>Sắp xếp theo</span>

                <Button
                    onClick={() => handleSortByCreatedAt()}
                    className={cx(
                        sort === '-createdAt' ? 'primary' : 'secondary'
                    )}
                >
                    Mới nhất
                </Button>

                <Button
                    onClick={() => handleSortBySold()}
                    className={cx(sort === '-sold' ? 'primary' : 'secondary')}
                >
                    Bán chạy
                </Button>

                <select
                    className={cx('filters-price')}
                    value={sort === '-createdAt' ? sort : undefined}
                    onChange={(e) => handleChangePrice(e.target.value)}
                >
                    <option value="">Giá</option>
                    <option value="price">Giá: Thấp đến cao</option>
                    <option value="-price">Giá: Cao đến thấp</option>
                </select>
            </div>

            {/* FILTERS MOBILE */}
            <div className="filters__mobile">
                <select
                    className={cx('filters__mobile-category')}
                    onChange={(e) => handleChangeType(e.target.value)}
                >
                    <option value="all">Tất cả sản phẩm</option>
                    {categories &&
                        categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                </select>
                <select
                    className={cx('filters__mobile-sort')}
                    value={sort === '-createdAt' ? sort : undefined}
                    onChange={(e) => handleChangeSort(e.target.value)}
                >
                    <option value="-createdAt">Mới nhất</option>
                    <option value="-sold">Bán chạy</option>
                    <option value="price">Giá: Thấp đến cao</option>
                    <option value="-price">Giá: Cao đến thấp</option>
                </select>
            </div>
            <div className={cx('paginate')}>
                <div className={cx('paginate-number')}>
                    <span className={cx('pagination-active')}>{page}</span>/
                    {Math.ceil(totalProducts / 8)}
                </div>
                {totalProducts / 8 <= 1 ? undefined : (
                    <div className={cx('paginate-btn')}>
                        <Button
                            className={cx(
                                `paginate-btn__icon ${
                                    page === 1 ? 'disable secondary' : 'primary'
                                }`
                            )}
                            iconLeft={<ChevronLeftIcon />}
                            onClick={handlePaginationDown}
                        />
                        <Button
                            className={cx(
                                `paginate-btn__icon ${
                                    page === Math.ceil(totalProducts / 8)
                                        ? 'disable secondary'
                                        : 'primary'
                                }`
                            )}
                            iconLeft={<ChevronRightIcon />}
                            onClick={handlePaginationUp}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Filters
