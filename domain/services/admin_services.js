const { ResponseWeb, enum_util, log_util } = require('../../utils')
const { admin_repo } = require('../repository')

const bycrypt = require('bcrypt')
const {
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED,
} = process.env
const jwt = require('jsonwebtoken')
const Validator = require("fastest-validator");
const v = new Validator();

exports.LoginAdmin = async (request) => {
    try {
        const { email, password } = request.body

        const schema = {
            email: "email|empty:false",
            password: "string|min:6",
        };

        const validate = v.validate(request.body, schema);
        if (validate.length) {
            return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", validate, {})
        }

        const admin = await admin_repo.FetchAdminByEmail(email)

        if (!admin) {
            return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "account not registered", {})
        }

        const isValidPassword = await bycrypt.compare(
            password,
            admin.password
        )
        if (!isValidPassword) {
            return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "wrong password", {})
        }

        const success_login = await admin_repo.FetchAdminByEmail(email)

        return await ResponseWeb(enum_util.CODE_OK, "success", "login successful", success_login)
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}


exports.RegisterAdmin = async (request) => {
    try {

        const schema = {
            email: "email|empty:false",
            password: "string|min:6",
        };

        const validate = v.validate(request.body, schema);

        if (validate.length) {
            return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", validate, {})
        }

        const { email } = request.body
        const admin = await admin_repo.FetchAdminByEmail(email)
        if (admin) {
            return await ResponseWeb(enum_util.CODE_CONFLICT, "error", "email already exist", {})
        }
        const password = await bycrypt.hash(request.body.password, 10)
        const data = {
            email: email,
            password: password,
        }

        const createdAdmin = await admin_repo.PostVisitor(data)
        return await ResponseWeb(enum_util.CODE_CREATED, "success", "data has been store", createdAdmin)
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}