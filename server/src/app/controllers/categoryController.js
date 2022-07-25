const Category = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryController = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json({
                status: 200,
                message: 'Success',
                data: categories,
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Có lỗi hệ thống xảy ra. Hãy thử lại',
            })
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body
            const category = await Category.findOne({ name })
            if (category)
                return res.status(400).json({
                    status: 400,
                    message: 'Danh mục này đã tồn tại',
                })
            const newCategory = new Category({ name })
            await newCategory.save()
            res.json({
                status: 200,
                message: 'Tạo mới thành công 1 danh mục',
                data: newCategory,
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Tên danh mục không được để trống',
            })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body
            if (name === '')
                return res.status(400).json({
                    status: 400,
                    message: 'Tên danh mục không được để trống',
                })
            await Category.findOneAndUpdate({ _id: req.params.id }, { name })
            res.json({
                status: 200,
                message: 'Chỉnh sửa thành công 1 danh mục',
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Danh mục đã tồn tại, Vui lòng kiểm tra lại',
            })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const products = await Products.findOne({
                category: req.params.id,
            })
            if (products)
                return res.status(400).json({
                    status: 400,
                    message:
                        'Không thể xóa do có sản phẩm nằm trong danh mục này',
                })
            await Category.findByIdAndDelete(req.params.id)
            res.json({
                status: 200,
                message: 'Xóa thành công 1 danh mục',
                request: req.params,
            })
        } catch (error) {
            return res.status(500).json({
                stauts: 500,
                message: 'Có lỗi hệ thống xảy ra. Hãy thử lại',
            })
        }
    },
}

module.exports = categoryController
