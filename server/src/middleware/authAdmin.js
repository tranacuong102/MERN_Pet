const Users = require('../app/models/userModel')

const authAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.user.id })
        if (user.roles === 1)
            return res
                .status(400)
                .json({ message: 'Admin resources access denied' })
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = authAdmin
