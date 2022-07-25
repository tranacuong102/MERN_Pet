const Post = require('../models/postModel')

const postController = {
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find().sort('-createdAt')
            res.json({
                status: 200,
                message: 'Success',
                data: posts,
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Có lỗi hệ thống xảy ra. Hãy thử lại',
            })
        }
    },
    createPost: async (req, res) => {
        try {
            const { title, images, description } = req.body
            const post = await Post.findOne({ title })
            if (post)
                return res.status(400).json({
                    status: 400,
                    message: 'Bài viết này đã tồn tại',
                })
            const newPost = new Post({ title, images, description })
            await newPost.save()
            res.json({
                status: 200,
                data: newPost,
                message: 'Tạo mới thành công 1 bài viết',
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Có lỗi hệ thống xảy ra. Hãy thử lại',
            })
        }
    },
    updatePost: async (req, res) => {
        try {
            const { title, images, description } = req.body
            if (title === '')
                return res.status(400).json({
                    status: 400,
                    message: 'Tiêu đề bài không được để trống',
                })
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                { title, images, description }
            )
            res.json({
                status: 200,
                message: 'Chỉnh sửa thành công bài viết',
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Bài viết đã tồn tại, Vui lòng kiểm tra lại',
            })
        }
    },
    deletePost: async (req, res) => {
        try {
            await Post.findByIdAndDelete(req.params.id)
            res.json({
                status: 200,
                message: 'Xóa thành công bài viết',
            })
        } catch (error) {
            return res.status(500).json({
                stauts: 500,
                message: 'Có lỗi hệ thống xảy ra. Hãy thử lại',
            })
        }
    },
}

module.exports = postController
