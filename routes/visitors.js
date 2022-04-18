var express = require('express');
const { log_util } = require('../utils');
var router = express.Router();
const { visitors_controller } = require('../domain/controller')
const verify_token = require('../middlewares/verify_token')

console.log('[[Visitors]]')
log_util.LogInfo('[GET]=/visitors/')
log_util.LogInfo('[GET]=/visitors/:id')
log_util.LogSuccess('[POST]=/visitors/')
log_util.LogWarning('[PUT]=/visitors/:id')
log_util.LogDanger('[DELETE]=/visitors/:id')

router.get('/visitors', verify_token, visitors_controller.FetchAllVisitor)
router.get('/visitors/:id', visitors_controller.FetchDetailVisitor)
router.post('/visitors', visitors_controller.PostVisitor)
router.put('/visitors/:id', verify_token, visitors_controller.PutVisitor)
router.delete('/visitors/:id', verify_token, visitors_controller.DeleteVisitor)
module.exports = router;
