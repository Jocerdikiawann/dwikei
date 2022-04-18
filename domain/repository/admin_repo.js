const getDatabase = require('../db')

exports.FetchAdminById = async (id) => {
    return await getDatabase.db.models.Admin.findOne({ _id: id })
}

exports.FetchAdminByEmail = async (email) => {
    return await getDatabase.db.models.Admin.findOne({ email: email })
}

exports.PostAdmin = async (data) => {
    return await getDatabase.db.models.Admin.create(data)
}

exports.PutAdmin = async (oldData, newData) => {
    return await getDatabase.db.models.Admin.updateOne(oldData, newData)
}