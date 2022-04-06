module.exports = (db) => {
    var refresh_token = new db.Schema({
        token: {
            type: String,
            required: true,
        },
        admin_id: {
            type: String,
            ref: "admin"
        },
    }, {
        timestamps: true
    })
    return db.model('refresh_token', refresh_token)
}