const jwt = require('jsonwebtoken')
const { ResponseWeb, enum_util } = require('../utils')
const { JWT_SECRET_ACCESS_TOKEN } = process.env

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(enum_util.CODE_UNAUTHORIZED).json({
        code: enum_util.CODE_UNAUTHORIZED,
        status: "error",
        message: "Unauthorized",
        data: {}
    })

    try {
        jwt.verify(token, JWT_SECRET_ACCESS_TOKEN, function (err, decode) {
            if (err) {
                const response = ResponseWeb(enum_util.CODE_FORBIDDEN, "error", err.message, {})
                return res.status(response.code).json(response)
            }
            req.user = decode
            return next()
        })
    } catch (error) {
        return res.status(enum_util.CODE_BAD_REQUEST).json({
            code: enum_util.CODE_BAD_REQUEST,
            status: "error",
            message: "Unauthorized",
            data: {}
        })
    }
}