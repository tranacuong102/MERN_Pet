const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

// we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

router.post('/', auth, (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({
                message: 'Vui lòng chọn hình ảnh để thực hiện chức năng',
            })

        const file = req.files.file
        if (file.size > 1024 * 1024 * 5) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ message: 'Dung lượng ảnh quá lớn' })
        }

        if (
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/jpg' &&
            file.mimetype !== 'image/png'
        ) {
            removeTmp(file.tempFilePath)
            return res
                .status(400)
                .json({ message: 'Định dạng file không đúng' })
        }

        cloudinary.v2.uploader.upload(
            file.tempFilePath,
            { folder: 'cld-images' },
            async (err, result) => {
                if (err) throw err
                removeTmp(file.tempFilePath)

                res.json({
                    status: 200,
                    public_id: result.public_id,
                    url: result.secure_url,
                })
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// Delete image only admin can use
router.post('/destroy', auth, (req, res) => {
    try {
        const { public_id } = req.body
        if (!public_id)
            return res
                .status(400)
                .json({ message: 'Không có hình ảnh được chọn để xóa' })

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err

            res.json({ status: 200, message: 'Xóa thành công 1 hình ảnh' })
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}

module.exports = router
