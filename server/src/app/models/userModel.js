const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        avatar: { type: String, default: '' },
        roles: { type: Number, default: 1 },
        coins: { type: Number, default: 0 },
        cart: { type: Array, default: [] },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Users', userSchema)
