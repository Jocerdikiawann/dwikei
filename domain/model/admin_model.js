module.exports = (db) => {
    var admin = new db.Schema({
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    })
    return db.model('admin', admin)
}