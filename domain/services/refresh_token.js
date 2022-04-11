const { ResponseWeb, enum_util, log_util } = require('../../utils')
const { admin_repo, token_repo } = require('../repository')

const {
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED,
} = process.env

const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Validator = require("fastest-validator");
const v = new Validator();

exports.PostToken = async (request) => {
    try {
        const { admin_id, refresh_token } = request.body
        const schema = {
            refresh_token: "string",
            user_id: "string",
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", validate, {})
        }

        const admin = await admin_repo.FetchAdminByEmail(email)

        if (!admin) {
            return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "account not registered", {})
        }

        const createdToken = await token_repo.PostToken({ admin_id: admin_id, token: refresh_token })
        return await ResponseWeb(enum_util.CODE_OK, "success", "token has been created", {
            id: createdToken._id
        })
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}

exports.PostRefreshToken = async (request) => {
    const { refresh_token, email } = request.body
    const schema = {
        refresh_token: "string:empty:false",
        email: "email|empty:false",
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", validate, {})
    }

    await token_repo.FetchToken(refresh_token)

    jwt.verify(refresh_token, JWT_REFRESH_TOKEN)
}


exports.FetchToken = async (request) => {
    try {
        const { refresh_token } = request.query.refresh_token
        const token = await token_repo.FetchToken(refresh_token)

        if (!token) {
            return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "invalid token", {})
        }

        return await ResponseWeb(enum_util.CODE_OK, "success", "token has been sent", token)
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "token null", {})
    }
}