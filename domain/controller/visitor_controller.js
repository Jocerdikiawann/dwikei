const { enum_util, log_util, ResponseWeb } = require('../../utils');
const { visitors_services } = require('../services')

exports.FetchAllVisitor = async (req, res) => {
    const visitors = await visitors_services.FetchAllVisitors()
    return res.status(visitors.code).json(visitors)
}

exports.FetchDetailVisitor = async (req, res) => {
    const visitor = await visitors_services.FetchDetailVisitors(req)
    return res.status(visitor.code).json(visitor)
}


exports.PostVisitor = async (req, res) => {
    const new_visitor = await visitors_services.PostVisitor(req)
    return res.status(new_visitor.code).json(new_visitor)
}

exports.PutVisitor = async (req, res) => {
    const updated_visitor = await visitors_services.PutVisitor(req)
    return res.status(updated_visitor.code).json(updated_visitor)

}

exports.DeleteVisitor = async (req, res) => {
    const deleted_visitor = await visitors_services.DeleteVisitor(req)
    return res.status(deleted_visitor.code).json(deleted_visitor)
}