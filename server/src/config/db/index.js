const mongoose = require('mongoose')

// const URI = process.env.MONGODB_URL

async function connectDB() {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gjjgwq6.mongodb.net/?retryWrites=true&w=majority`
        )
        console.log('Connect successfully!')
    } catch (error) {
        console.log('Connect failure!')
    }
}

module.exports = { connectDB }
