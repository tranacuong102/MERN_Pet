const express = require('express')
const router = express.Router()
const productController = require('../app/controllers/productController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/', productController.getProducts)

router.get('/all', productController.getAllProducts)

router.get('/deleted', productController.getDeletedProducts)

router.post('/create', productController.createProduct)

router.put('/update/:id', productController.updateProduct)

router.patch('/restore/:id', productController.restoreProduct)

router.delete('/delete/:id', auth, authAdmin, productController.deleteProduct)

router.delete('/destroy/:id', auth, authAdmin, productController.destroyProduct)

module.exports = router
