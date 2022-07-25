const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    register: async (req, res) => {
        try {
            const { username, email, password, confirmPassword } = req.body
            const user = await Users.findOne({ username })

            if (user)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Tên tài khoản đã tồn tại.' })
            if (password !== confirmPassword)
                return res.status(400).json({
                    status: 400,
                    message: 'Mật khẩu xác thực không chính xác.',
                })
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new Users({
                username,
                email,
                password: passwordHash,
            })
            await newUser.save()

            res.status(200).json({
                status: 200,
                message: 'Tạo tài khoản mới thành công',
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body
            const user = await Users.findOne({ username })
            if (!user)
                return res.status(400).json({
                    status: 400,
                    message: 'Sai tên tài khoản hoặc mật khẩu.',
                })
            const isPassword = await bcrypt.compare(password, user.password)
            if (!isPassword)
                return res.status(400).json({
                    status: 400,
                    message: 'Sai tên tài khoản hoặc mật khẩu.',
                })

            // Login success, create access token
            const accesstoken = createAccessToken({ id: user._id })

            res.status(200).json({
                status: 200,
                message: 'Đăng nhập thành công! Chuyển tiếp đến trang chủ.',
                data: user,
                accesstoken,
            })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },
    logout: async (req, res) => {
        try {
            // res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ status: 200, message: 'Đăng xuất thành công' })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    profile: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user)
                return res
                    .status(400)
                    .json({ status: 400, message: 'User does not exist.' })
            res.json({ status: 200, data: user })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },
    updateAvatar: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user)
                res.status(400).json({
                    status: 400,
                    message: 'Người dùng không tồn tại',
                })

            await Users.findOneAndUpdate(
                { _id: req.user.id },
                { avatar: req.body.avatar }
            )
            return res.status(200).json({
                status: 200,
                data: user.avatar,
                message: 'Cập nhật thành công ảnh đại diện',
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user)
                res.status(400).json({
                    status: 400,
                    message: 'Người dùng không tồn tại',
                })

            await Users.findOneAndUpdate(
                { _id: req.user.id },
                { cart: req.body.cart }
            )
            return res.status(200).json({
                status: 200,
                message: 'Cập nhật thành công sản phẩm vào giỏ hàng',
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    buyProduct: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user)
                res.status(400).json({
                    status: 400,
                    message: 'Người dùng không tồn tại',
                })
            await Users.findOneAndUpdate(
                { _id: req.user.id },
                { coins: req.body.coins }
            )
            return res.status(200).json({
                status: 200,
                message:
                    'Sản phẩm sẽ được giao trong 7 ngày kể từ ngày đặt hàng',
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    buyCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user)
                res.status(400).json({
                    status: 400,
                    message: 'Bạn cần đăng nhập để mua sản phẩm',
                })
            await Users.findOneAndUpdate(
                { _id: req.user.id },
                {
                    ...user,
                    coins: req.body.coins,
                    cart: req.body.cart,
                }
            )
            return res.status(200).json({
                status: 200,
                message:
                    'Sản phẩm sẽ được giao trong 7 ngày kể từ ngày đặt hàng',
            })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userController
