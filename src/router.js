const Router = require('koa-router');
const router = new Router();

const apiController = require('./controller/api');

router.get('/api/holiday', apiController.holiday);
router.get('/api/xlsx', apiController.xlsx);
router.get('/api/webhook', apiController.webhook);

module.exports = router;