import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'
// import ClearIcon from '@mui/icons-material/Clear'
import Image from '../../commons/widgets/Image'
import { getCurrentUser } from '../../models/User'
import DefaultAvatar from '../../assets/images/DefaultAvatar.jpg'
import UploadService from '../../services/UploadService'
import AnimationLoading from '../../commons/widgets/AnimationLoading'
import AuthService from '../../services/AuthService'
import CoreService from '../../services/CoreService'

import '../../styles/pages/Profile.scss'

function Profile() {
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [editAvatar, setEditAvatar] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [publicId, setPublicId] = useState('')
    const currentUser = getCurrentUser()

    const handleUpload = async (event) => {
        event.preventDefault()
        try {
            const file = event.target.files[0]

            if (file.size > 1024 * 1024 * 5)
                return CoreService.showAlertError('Dung lượng ảnh quá lớn')

            if (
                file.type !== 'image/jpg' &&
                file.type !== 'image/jpeg' &&
                file.type !== 'image/png'
            )
                return CoreService.showAlertError('Định dạng file không đúng')

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const { public_id, url } = await UploadService.uploadImage(formData)

            await AuthService.updateAvatar({ avatar: url })

            localStorage.setItem(
                '@currentAuth',
                JSON.stringify({ ...currentUser, avatar: url })
            )
            setEditAvatar(true)
            setPublicId(public_id)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        const changeAvatar = async () => {
            const infoAuth = await JSON.parse(
                localStorage.getItem('@currentAuth')
            )
            setAvatar(infoAuth.avatar)
            setEditAvatar(false)
            setLoading(false)
        }
        changeAvatar()
    }, [editAvatar])

    return (
        <div className="profile">
            <h2 className="profile__header">Trang cá nhân</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <div className="profile-avatar">
                        <h2 className="profile-avatar__heading">
                            Chỉnh sửa ảnh đại điện
                        </h2>
                        <div className="profile-avatar__content">
                            <input
                                type="file"
                                name="file"
                                id="file_upload"
                                onChange={handleUpload}
                            />

                            {loading ? (
                                <div id="file_img">{<AnimationLoading />}</div>
                            ) : (
                                <div id="file_img">
                                    <Image
                                        src={avatar ? avatar : DefaultAvatar}
                                        alt=""
                                        fallBack={DefaultAvatar}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className="profile-info">
                        <h2 className="profile-info__heading">
                            Thông tin cá nhân
                        </h2>
                        <p className="profile-info__username">
                            Tên tài khoản: <span>{currentUser.username}</span>
                        </p>
                        <p className="profile-info__email">
                            Email: <span>{currentUser.email}</span>
                        </p>
                        <p className="profile-info__coins">
                            Số dư trong ví:{' '}
                            <span>
                                {currentUser.coins.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </p>
                        <p className="profile-info__password">
                            <Button variant="outlined" color="error">
                                Thay đổi mật khẩu
                            </Button>
                        </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile
