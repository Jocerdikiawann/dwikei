var express = require('express');
const { log_util } = require('../utils');
var router = express.Router();
const { visitors_services } = require('../domain/services')

console.log('[[Visitors]]')
log_util.LogInfo('[GET]=/visitors/')
log_util.LogInfo('[GET]=/visitors/:id')
log_util.LogSuccess('[POST]=/visitors/')
log_util.LogWarning('[PUT]=/visitors/:id')
log_util.LogDanger('[DELETE]=/visitors/:id')

router.get('/visitors', visitors_services.FetchAllVisitor)
router.get('/visitors/:id', visitors_services.FetchDetailVisitor)
router.post('/visitors', visitors_services.PostVisitor)
router.put('/visitors/:id', visitors_services.PutVisitor)
router.delete('/visitors/:id', visitors_services.DeleteVisitor)
module.exports = router;
