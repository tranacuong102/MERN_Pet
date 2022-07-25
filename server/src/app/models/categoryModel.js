const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    }
)

mongoose.plugin(slug)

module.exports = mongoose.model('Categories', categorySchema)
