const jwt = require('jsonwebtoken')
const { ResponseWeb, enum_util } = require('../utils')
const { JWT_SECRET } = process.env

module.exports = async (req, res, next) => {
    const token = req.headers.authorization
    jwt.verify(token, JWT_SECRET, function (err, decode) {
        if (err) {
            return await ResponseWeb(enum_util.CODE_FORBIDDEN, "error", err.message, {})
        }
        req.user = decode
        return next()
    })
}