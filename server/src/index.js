require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const route = require('./routes')
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({ useTempFiles: true }))

// Connect to Mongodb
const db = require('./config/db')
db.connectDB()

// Routes
route(app)

// Build production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// PORT
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
