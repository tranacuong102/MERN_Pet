import React from 'react'
import { CircularProgress } from '@mui/material'

import './style.scss'

function CommonLoading() {
    return (
        <div className="main-loading">
            <CircularProgress />
        </div>
    )
}

export default CommonLoading
