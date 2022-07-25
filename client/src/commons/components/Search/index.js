import { useEffect, useRef, useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import useDebounce from '../../../stores/hooks/useDebounce'
import { SearchIcon } from '../../widgets/Icons'
import SearchService from '../../../services/SearchService'
import SearchItem from './SearchItem'
import CloseIcon from '@mui/icons-material/Close'

import './style.scss'

function Search({ openSearch, setOpenSearch }) {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showSearchResult, setShowSearchResult] = useState(true)
    const [loading, setLoading] = useState(false)
    const inputSearchRef = useRef()

    const debounced = useDebounce(searchValue, 1000)

    const handleClearSearchValue = () => {
        setSearchValue('')
        inputSearchRef.current.focus()
        setSearchResult([])
    }

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([])
            return
        }
        setLoading(true)

        const handleSearchTerm = async () => {
            try {
                const { data } = await SearchService.get(debounced)
                setSearchResult(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        handleSearchTerm()
    }, [debounced])

    const handleHideSearchResult = () => {
        setShowSearchResult(false)
    }

    const handleChangeSearchValue = (e) => {
        const keySearch = e.target.value
        if (keySearch.startsWith(' ')) {
            return
        } else {
            setSearchValue(keySearch)
        }
    }

    const handleCloseSearch = () => {
        setOpenSearch(false)
        setSearchValue('')
        setSearchResult([])
    }

    return (
        <Tippy
            offset={[-58, 5]}
            visible={showSearchResult && searchResult.length > 0}
            interactive={true}
            render={(attrs) => (
                <div className="search__result" tabIndex="-1" {...attrs}>
                    <h4 className="search__title">Kết quả tìm kiếm</h4>
                    {searchResult.map((item) => {
                        return <SearchItem key={item._id} product={item} />
                    })}
                </div>
            )}
            onClickOutside={handleHideSearchResult}
        >
            <div className={`search ${openSearch ? 'open' : ''}`}>
                <input
                    ref={inputSearchRef}
                    type="text"
                    className="search__input"
                    placeholder="Nhập từ khóa để tìm kiếm sản phẩm ..."
                    spellCheck={false}
                    value={searchValue}
                    onChange={handleChangeSearchValue}
                    onFocus={() => setShowSearchResult(true)}
                />
                <div className="search__status">
                    {!!searchValue && !loading && (
                        <div
                            className="search__status-clear"
                            onClick={handleClearSearchValue}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </div>
                    )}
                    {loading && (
                        <div className="search__status-loading">
                            <FontAwesomeIcon icon={faSpinner} />
                        </div>
                    )}
                </div>
                <button className="search__btn">
                    {openSearch ? (
                        <CloseIcon onClick={handleCloseSearch} />
                    ) : (
                        <SearchIcon className="search__btn-icon" />
                    )}
                </button>
            </div>
        </Tippy>
    )
}

export default Search
