var express = require('express');
const { log_util } = require('../utils');
var router = express.Router();
const { admin_controller } = require('../domain/controller')
const verify_token = require('../middlewares/verify_token')

console.log('[[admin]]')
log_util.LogInfo('[GET]=/admin/')
log_util.LogInfo('[GET]=/admin/:id')
log_util.LogSuccess('[POST]=/admin/')
log_util.LogWarning('[PUT]=/admin/:id')
log_util.LogDanger('[DELETE]=/admin/:id')

router.post('/admin', admin_controller.LoginAdmin)
router.post('/admin/register', admin_controller.RegisterAdmin)
router.post('/admin/logout', verify_token, admin_controller.LogoutAdmin)
module.exports = router;
