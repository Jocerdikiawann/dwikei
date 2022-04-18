const { ResponseWeb, enum_util, log_util } = require('../../utils')
const { admin_repo, token_repo } = require('../repository')

const bycrypt = require('bcrypt')
const {
    JWT_SECRET_ACCESS_TOKEN,
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

        const access_token = jwt.sign({ email: admin.email, admin_id: admin._id }, JWT_SECRET_ACCESS_TOKEN, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRED
        })

        const refresh_token = jwt.sign({ email: admin.email, admin_id: admin._id }, JWT_SECRET_REFRESH_TOKEN, {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRED
        })


        await token_repo.PostToken({ admin_id: admin._id, token: refresh_token })

        const created_token = await token_repo.FetchToken(admin._id)

        const data = {
            "email": admin.email,
            "access_token": access_token,
            "refresh_token": created_token.token
        }

        return await ResponseWeb(enum_util.CODE_CREATED, "success", "login successful", data)
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

        await admin_repo.PostAdmin(data)

        const created_admin = await admin_repo.FetchAdminByEmail(email)


        return await ResponseWeb(enum_util.CODE_CREATED, "success", "data has been store", created_admin)

    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}

exports.UpdateAdmin = async (request) => {
    try {
        const { id } = request.params
        const { password } = request.body
        const schema = {
            password: "string|min:6",
        }

        const validate = v.validate(request.body, schema);

        if (validate.length) {
            return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", validate, {})
        }

        const admin = await admin_repo.FetchAdminById(id)

        if (!admin) {
            return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", "account not found", {})
        }

        const isValidPassword = await bycrypt.compare(
            password,
            admin.password
        )

        if (!isValidPassword) {
            return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "wrong password", {})
        }

        const hash_password = await bycript.hash(password, 10);


        await admin_repo.PutAdmin(admin, { password: hash_password })

        return await ResponseWeb(enum_util.CODE_CREATED, "success", "user has been updated", {})
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}

exports.LogoutAdmin = async (request) => {
    try {
        const { admin_id } = request.body
        const token = await token_repo.FetchToken(admin_id)
        console.log(token)
        if (!token) return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "account not found", {})
        await token_repo.DeleteToken(token)
        return await ResponseWeb(enum_util.CODE_OK, "success", "logout successfull", {})
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}