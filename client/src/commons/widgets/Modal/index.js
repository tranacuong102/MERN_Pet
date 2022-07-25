import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import CloseIcon from '@mui/icons-material/Close'

import { MODAL } from '../../../utils/Constants'

import './style.scss'

function Modal({
    title = MODAL.DEFAULT_TITLE,
    open,
    className,
    children,
    handleDelete,
    handleDestroyProduct,
    handleClose,
    loading,
    fullScreen = false,
}) {
    return (
        <Dialog
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="scroll-dialog-header"
            aria-describedby="scroll-dialog-description"
            className={`common-modal ${className}`}
            fullScreen={fullScreen}
        >
            <DialogTitle
                id="scroll-dialog-header"
                className="common-modal__header"
            >
                <div
                    className="header-left"
                    style={
                        handleDestroyProduct
                            ? {
                                  color: 'red',
                              }
                            : {}
                    }
                >
                    <h3 className="common-modal-title">{title}</h3>
                </div>
                {handleClose ? (
                    <CloseIcon
                        className="close-icon"
                        onClick={() => handleClose()}
                    >
                        close
                    </CloseIcon>
                ) : (
                    ''
                )}
            </DialogTitle>
            <DialogContent className="common-modal__content">
                <DialogContentText
                    as="div"
                    id="scroll-dialog-description"
                    tabIndex={-1}
                >
                    {children}
                </DialogContentText>
            </DialogContent>

            <DialogActions className="common-modal__bottom">
                <LoadingButton
                    variant="contained"
                    color="error"
                    onClick={handleDelete || handleDestroyProduct}
                    loading={loading}
                >
                    {MODAL.DEFAULT_TEXT_OK}
                </LoadingButton>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleClose}
                >
                    {MODAL.DEFAULT_TEXT_CANCEL}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal
