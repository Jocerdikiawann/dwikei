const { enum_util, ResponseWeb } = require('../../utils')
const getDatabase = require('../db')

exports.FetchAdminByEmail = async (email) => {
    return await getDatabase.db.models.Admin.findOne({ email: email })
}

exports.PostVisitor = async (data) => {
    return await getDatabase.db.models.Admin.create(data)
}

exports.PutVisitor = async (oldData, newData) => {
    return await getDatabase.db.models.Admin.updateOne(oldData, newData)
}