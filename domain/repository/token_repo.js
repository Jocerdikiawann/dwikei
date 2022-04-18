
const getDatabase = require('../db')

exports.FetchToken = async (admin_id) => {
    return await getDatabase.db.models.Token.findOne({ admin_id: admin_id })
}

exports.PostToken = async (data) => {
    return await getDatabase.db.models.Token.create(data)
}

exports.DeleteToken = async (data) => {
    return await getDatabase.db.models.Token.deleteOne(data)
}