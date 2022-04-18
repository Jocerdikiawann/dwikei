var express = require('express');
const { log_util } = require('../utils');
var router = express.Router();
const { token_controller } = require('../domain/controller')

console.log('[[token]]')
log_util.LogSuccess('[POST]=/token')
log_util.LogWarning('[POST]=/token')

router.post("/token", token_controller.CreateToken)
module.exports = router;
