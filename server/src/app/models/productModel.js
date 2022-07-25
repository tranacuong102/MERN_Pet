const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema
const productSchema = new Schema(
    {
        title: { type: String, maxLength: 255, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        images: { type: String, required: true },
        price: { type: Number, trim: true, required: true },
        discount: { type: Number, required: true, default: 0 },
        category: { type: String, required: true, trim: true },
        origin: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true, default: 1 },
        sold: { type: Number, default: 0 },
        checked: { type: Boolean, default: true },
        slug: { type: String, slug: 'title', unique: true },
    },
    { timestamps: true }
)

mongoose.plugin(slug)
productSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Products', productSchema)
