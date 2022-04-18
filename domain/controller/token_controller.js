const { token_services } = require('../services')

exports.CreateToken = async (req, res) => {
    const token = await token_services.PostToken(req)
    return res.status(token.code).json(token)
}