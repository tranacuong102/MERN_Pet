const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const postRouter = require('./postRouter')
const uploadRouter = require('./uploadRouter')
const searchRouter = require('./searchRouter')
const paymentRouter = require('./paymentRouter')
function route(app) {
    app.use('/auth', userRouter)
    app.use('/api/categories', categoryRouter)
    app.use('/api/products', productRouter)
    app.use('/api/posts', postRouter)
    app.use('/api/upload', uploadRouter)
    app.use('/api/search', searchRouter)
    app.use('/api/payments', paymentRouter)
}

module.exports = route
