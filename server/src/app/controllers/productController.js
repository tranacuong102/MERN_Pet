const Products = require('../models/productModel')

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'a')
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'e')
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'o')
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u')
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y')
    str = str.replace(/Đ/g, 'd')
    return str
}

class APIfeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }
    filtering() {
        const queryObj = { ...this.queryString } // queryString = req.query

        const excludedFields = ['page', 'sort', 'limit', 'search']
        excludedFields.forEach((el) => delete queryObj[el])

        if (queryObj.name !== undefined) {
            this.query.find({ category: queryObj.name })
        } else {
            this.query.find()
        }

        return this
    }
    sorting() {
        const queryObj = { ...this.queryString }
        if (queryObj.sort !== undefined) {
            const sortBy = queryObj.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 8
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
    counting() {
        this.query.count()
        return this
    }
}

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const product = await Products.find()
            res.status(200).json({
                status: 200,
                data: product,
                message: 'Success',
            })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .filtering()
                .sorting()
                .paginating()
            const count = new APIfeatures(Products.find(), req.query)
                .filtering()
                .counting()

            const result = await Promise.allSettled([
                features.query,
                count.query,
            ])

            const products =
                result[0].status === 'fulfilled' ? result[0].value : []
            const totalResult =
                result[1].status === 'fulfilled' ? result[1].value : 0

            res.json({
                status: 200,
                message: 'Success',
                data: products,
                totalCount: totalResult,
            })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },
    getDeletedProducts: async (req, res) => {
        try {
            const deletedProducts = await Products.findDeleted()
            res.status(200).json({
                status: 200,
                message: 'Success',
                data: deletedProducts,
            })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const {
                title,
                description,
                category,
                price,
                discount,
                images,
                quantity,
                origin,
            } = req.body
            if (!images)
                return res.status(400).json({
                    status: 400,
                    message: 'Vui lòng chọn hình ảnh cho sản phẩm',
                })
            const product = await Products.findOne({ title })
            if (product)
                return res
                    .status(400)
                    .json({ status: 400, message: 'Sản phẩm này đã tồn tại' })

            const newProduct = new Products({
                title,
                description,
                images,
                price,
                discount,
                quantity,
                origin,
                category,
            })
            await newProduct.save()
            res.status(200).json({
                status: 200,
                message: 'Thêm mới thành công 1 sản phẩm',
                newProduct,
            })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {
                title,
                description,
                images,
                price,
                discount,
                quantity,
                origin,
                category,
            } = req.body
            if (!images)
                return res.status(400).json({
                    status: 400,
                    message: 'Vui lòng chọn hình ảnh để chỉnh sửa sản phẩm',
                })
            await Products.findOneAndUpdate(
                { _id: req.params.id },
                {
                    title,
                    description,
                    images,
                    price,
                    discount,
                    quantity,
                    origin,
                    category,
                    slug: xoa_dau(title.replaceAll(' ', '-')),
                }
            )
            res.status(200).json({
                status: 200,
                message: 'Cập nhật thành công sản phẩm',
            })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.delete({ _id: req.params.id })
            res.status(200).json({
                status: 200,
                message: 'Xóa thành công 1 sản phẩm',
            })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },

    restoreProduct: async (req, res) => {
        try {
            await Products.restore({ _id: req.params.id })
            res.status(200).json({
                status: 200,
                message: 'Khôi phục thành công 1 sản phẩm',
            })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },

    destroyProduct: async (req, res) => {
        try {
            await Products.findOneAndDelete({ _id: req.params.id })
            res.status(200).json({
                status: 200,
                message: 'Xóa thành công 1 sản phẩm',
            })
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message })
        }
    },
}

module.exports = productController
