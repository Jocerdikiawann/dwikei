var express = require('express');
const { log_util } = require('../utils');
var router = express.Router();
const { admin_controller } = require('../domain/controller')

console.log('[[admin]]')
log_util.LogInfo('[GET]=/admin/')
log_util.LogInfo('[GET]=/admin/:id')
log_util.LogSuccess('[POST]=/admin/')
log_util.LogWarning('[PUT]=/admin/:id')
log_util.LogDanger('[DELETE]=/admin/:id')

router.post('/admin', admin_controller.LoginAdmin)
router.post('/admin/register', admin_controller.RegisterAdmin)
module.exports = router;
