const express = require('express')
const router = express.Router()

const categoryController = require('../app/controllers/categoryController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/', categoryController.getCategories)

router.post('/create', auth, authAdmin, categoryController.createCategory)

router.put('/update/:id', auth, authAdmin, categoryController.updateCategory)

router.delete('/delete/:id', auth, authAdmin, categoryController.deleteCategory)

module.exports = router
