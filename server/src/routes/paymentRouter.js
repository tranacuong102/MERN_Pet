const express = require('express')
const router = express.Router()

const paymentController = require('../app/controllers/paymentController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/', auth, paymentController.getPayments)

router.post('/create', auth, paymentController.createPayment)

router.get('/all', auth, authAdmin, paymentController.getAllPayments)

router.get('/search', auth, authAdmin, paymentController.searchPayments)

module.exports = router
