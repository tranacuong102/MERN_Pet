const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

const userController = require('../app/controllers/userController')

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/logout', userController.logout)

router.patch('/changeavatar', auth, userController.updateAvatar)

router.get('/profile', auth, userController.profile)

router.patch('/addcart', auth, userController.addCart)

router.patch('/buyone', auth, userController.buyProduct)

router.put('/buycart', auth, userController.buyCart)

module.exports = router
