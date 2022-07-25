const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        if (!token)
            return res.status(400).json({ message: 'Invalid Authentication' })

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if (error)
                return res
                    .status(400)
                    .json({ message: 'Invalid Authentication' })
            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = auth
