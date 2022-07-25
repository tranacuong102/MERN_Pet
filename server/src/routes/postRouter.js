const express = require('express')
const router = express.Router()

const postController = require('../app/controllers/postController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/', postController.getPosts)

router.post('/create', auth, authAdmin, postController.createPost)

router.put('/update/:id', auth, authAdmin, postController.updatePost)

router.delete('/delete/:id', auth, authAdmin, postController.deletePost)

module.exports = router
