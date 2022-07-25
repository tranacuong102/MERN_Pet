const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        images: { type: String, required: true },
        description: { type: String, required: true, trim: true },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        timestamps: true,
    }
)

mongoose.plugin(slug)

module.exports = mongoose.model('Post', postSchema)
