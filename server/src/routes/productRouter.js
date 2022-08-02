const express = require('express')
const router = express.Router()
const productController = require('../app/controllers/productController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/', productController.getProducts)

router.get('/all', productController.getAllProducts)

router.get('/deleted', auth, authAdmin, productController.getDeletedProducts)

router.post('/create', auth, authAdmin, productController.createProduct)

router.put('/update/:id', auth, authAdmin, productController.updateProduct)

router.patch('/restore/:id', auth, authAdmin, productController.restoreProduct)

router.delete('/delete/:id', auth, authAdmin, productController.deleteProduct)

router.delete('/destroy/:id', auth, authAdmin, productController.destroyProduct)

module.exports = router
