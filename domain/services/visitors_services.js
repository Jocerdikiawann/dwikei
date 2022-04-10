const Validator = require("fastest-validator");
const v = new Validator();
const { ResponseWeb, enum_util, log_util } = require('../../utils')
const { visitors_repo } = require('../repository')

exports.FetchAllVisitors = async (request) => {
    try {
        const visitors = await visitors_repo.FetchAllVisitors()
        visitors.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt)
        })
        return await ResponseWeb(enum_util.CODE_OK, "success", "data has been sent", visitors)
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}

exports.FetchDetailVisitors = async (request) => {
    const { id } = request.params
    try {
        const visitor = await visitors_repo.FetchDetailVisitorById(id)
        if (!visitor)
            return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "visitor not found", {})

        return await ResponseWeb(enum_util.CODE_OK, "success", "data has been sent", visitor)
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}

exports.PostVisitor = async (request) => {
    try {
        const schema_validator = {
            full_name: "string|empty:false",
            number_phone: "string|empty:false",
            email: "string|empty:false",
            status_follow_up: "boolean|empty:false"
        }

        const validate = v.validate(request.body, schema_validator)
        if (validate.length) {
            return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", validate, {})
        }

        const new_visitor = await visitors_repo.PostVisitor(request.body)
        new_visitor.sort((a, b) => {
            a.createdAt - b.createdAt
        })
        return await ResponseWeb(enum_util.CODE_CREATED, "success", "data has been store", new_visitor)
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}

exports.PutVisitor = async (request) => {
    try {
        const { id } = request.params

        const schema_validator = {
            full_name: "string|optional",
            email: "string|optional",
            number_phone: "string|optional",
            status_follow_up: "boolean|optional"
        }

        const validate = v.validate(request.body, schema_validator)

        if (validate.length) {
            return await ResponseWeb(enum_util.CODE_BAD_REQUEST, "error", validate, {})
        }

        const check_user = await visitors_repo.FetchDetailVisitorById(id)

        if (!check_user)
            return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "visitor not found", {})

        const updated = await visitors_repo.PutVisitor(check_user, request.body)

        const new_data_user = await visitors_repo.FetchDetailVisitorById(id)

        if (!new_data_user)
            return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "visitor not found", {})

        return await ResponseWeb(enum_util.CODE_CREATED, "success", "data has been updated", new_data_user)
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}

exports.DeleteVisitor = async (request) => {
    try {
        const { id } = request.params
        const check_user = await visitors_repo.FetchDetailVisitorById(id)

        if (!check_user)
            return await ResponseWeb(enum_util.CODE_NOT_FOUND, "error", "visitor not found", {})

        await visitors_repo.DeleteVisitor(request.body)

        const visitors = await visitors_repo.FetchAllVisitors()

        visitors.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt)
        })
        return await ResponseWeb(enum_util.CODE_CREATED, "success", "data has been sent", visitors)
    } catch (error) {
        return await ResponseWeb(enum_util.CODE_BAD_REQUEST, 'error', error.message, {})
    }
}