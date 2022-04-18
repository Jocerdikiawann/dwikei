const { enum_util, log_util, ResponseWeb } = require('../../utils');
const { admin_services } = require('../services')

exports.LoginAdmin = async (req, res) => {
    const admin = await admin_services.LoginAdmin(req)
    return res.status(admin.code).json(admin)
}

exports.RegisterAdmin = async (req, res) => {
    const admin = await admin_services.RegisterAdmin(req)
    return res.status(admin.code).json(admin)
}

exports.LogoutAdmin = async (req, res) => {
    const admin = await admin_services.LogoutAdmin(req)
    return res.status(admin.code).json(admin)
}