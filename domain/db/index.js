const mongoose = require('mongoose');
const { adminModel, visitorsModel, tokenModel } = require('../model');
const { log_util, config_db_util } = require('../../utils');

let db = {}

if (config_db_util.db.mongodb && Object.keys(config_db_util.db.mongodb).length > 0) {
    const host = config_db_util.db.mongodb.host
    const port = config_db_util.db.mongodb.port
    const database = config_db_util.db.mongodb.database
    const connectionName = config_db_util.db.mongodb.nameconnection
    console.log(host, port)
    mongoose.connect(`mongodb://${host}:${port}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    db[connectionName] = {}
    db[connectionName].conn = mongoose
    db[connectionName].Admin = adminModel(mongoose)
    db[connectionName].Visitors = visitorsModel(mongoose)
    db[connectionName].Token = tokenModel(mongoose)

    exports.db = db;
} else {
    log_util.LogDanger("There is no linked database")
}