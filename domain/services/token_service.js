const { ResponseWeb, enum_util, log_util } = require('../../utils')
const { token_repo, admin_repo } = require('../repository')

const {
    JWT_SECRET_ACCESS_TOKEN,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED,
} = process.env

const jwt = require('jsonwebtoken')
const Validator = require("fastest-validator");
const v = new Validator();

exports.CreateAccessToken = async (request) => {
    try {
        const { refresh_token, admin_id } = request.body

        const schema = {
            refresh_token: "string|empty:false",
            admin_id: "string|empty:false"
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", validate, {})
        }

        const get_token = await token_repo.FetchToken(admin_id)

        if (!get_token) {
            return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", "invalid token", {})
        }

        const admin = await admin_repo.FetchAdminById(admin_id)

        if (!admin) {
            return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", "account not found", {})
        }

        jwt.verify(refresh_token, JWT_SECRET_REFRESH_TOKEN, (err, decode) => {
            if (err) {
                return ResponseWeb(enum_util.CODE_FORBIDDEN, "error", err.message, {})
            }

            console.log(`data : ${decode}`)
            if (admin_id !== decode.admin_id) {
                return ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", "invalid account", {})
            }

            const token = jwt.sign({ email: admin.email, admin_id: admin_id }, JWT_SECRET_ACCESS_TOKEN, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })

            return ResponseWeb(enum_util.CODE_CREATED, "success", "access token has been updated", { token: token })
        })
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}