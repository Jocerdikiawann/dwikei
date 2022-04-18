module.exports = (db) => {
    var token = new db.Schema({
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
    return db.model('token', token)
}