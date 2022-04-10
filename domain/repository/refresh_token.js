const { enum_util, ResponseWeb } = require('../../utils')
const getDatabase = require('../db')

exports.FetchToken = async (token) => {
    return await getDatabase.db.models.RefreshToken.findOne({ token: token })
}

exports.PostToken = async (data) => {
    return await getDatabase.db.models.RefreshToken.create(data)
}