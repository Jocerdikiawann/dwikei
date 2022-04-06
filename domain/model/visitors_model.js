module.exports = (db) => {
    var visitors = new db.Schema({
        full_name: {
            type: String,
            required: true
        },
        number_phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        status_follow_up: {
            type: Boolean,
            required: true,
        }
    }, {
        timestamps: true
    })
    return db.model('visitors', visitors)
}