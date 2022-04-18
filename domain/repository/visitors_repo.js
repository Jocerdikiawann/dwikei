
const getDatabase = require('../db')

exports.FetchAllVisitors = async () => {
    return await getDatabase.db.models.Visitors.find()
}

exports.FetchDetailVisitorById = async (id) => {
    return await getDatabase.db.models.Visitors.findOne({ _id: id })
}

exports.FetchDetailVisitorByEmail = async (email) => {
    return await getDatabase.db.models.Visitors.findOne({ email: email })
}

exports.PostVisitor = async (data) => {
    return await getDatabase.db.models.Visitors.create(data)
}

exports.PutVisitor = async (oldData, newData) => {
    return await getDatabase.db.models.Visitors.updateOne(oldData, newData)
}

exports.DeleteVisitor = async (data) => {
    return await getDatabase.db.models.Visitors.deleteOne(data)
}