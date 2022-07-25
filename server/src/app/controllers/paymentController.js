const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')
const paymentController = {
    getAllPayments: async (req, res) => {
        try {
            const payments = await Payments.find().sort('-createdAt').limit(10)
            res.json({ status: 200, data: payments, message: 'Success' })
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message })
        }
    },
    getPayments: async (req, res) => {
        try {
            const payments = await Payments.find({ user_id: req.user.id }).sort(
                '-createdAt'
            )
            res.json({ status: 200, data: payments, message: 'Success' })
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message })
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user)
                return res.status(400).json({
                    status: 400,
                    message: 'Bạn cần đăng nhập để thực hiện chức năng này',
                })
            const { _id, coins } = user
            const { username, phoneNumbers, address, products, cart } = req.body

            const total = products.reduce((prev, item) => {
                return prev + item.price * item.count
            }, 0)

            if (coins < total)
                return res.status(400).json({
                    status: 400,
                    message:
                        'Số dư trong tài khoản không đủ để thanh toán. Nạp thêm tiền hoặc chọn phương thức thanh toán khác',
                })

            // Mua 1 sản phẩm
            await Products.findOneAndUpdate(
                { _id: products[0]._id },
                { sold: products[0].sold + products[0].count }
            )
            // Xử lý khi mua sản phẩm sẽ cập nhật lại + sold

            // let ids = products.map((product) => product._id)
            // let count = products.map((product) => product.count)
            // await Products.updateMany(
            //     { _id: ids },
            //     { $set: { sold:  } }
            // )

            await Users.findOneAndUpdate({ _id: _id }, { cart: cart })

            const newPayment = new Payments({
                user_id: _id,
                username,
                phoneNumbers,
                address,
                products,
            })

            await newPayment.save()
            res.json({
                status: 200,
                message: 'Chúc mừng, Bạn đã mua thành công sản phẩm!',
            })
        } catch (error) {
            // res.status(500).json({ status: 500, message: error.message })
            res.status(500).json({ status: 500, message: 'CLGT' })
        }
    },
    searchPayments: async (req, res) => {
        const { q } = req.query
        try {
            const payments = await Payments.find({
                phoneNumbers: { $regex: `${q}` },
            })
            res.status(200).json({
                status: 200,
                data: payments,
                message: 'Success',
            })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },
}

module.exports = paymentController
