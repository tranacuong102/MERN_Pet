const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        username: { type: String, required: true, trim: true },
        phoneNumbers: { type: String, required: true },
        address: { type: String, required: true },
        products: { type: Array, default: [], required: true },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Payments', paymentSchema)
