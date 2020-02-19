const router = require('express').Router();
const adminCtrl = require('../controllers/adminControllers');

router.post('/', adminCtrl.getAdminData);


module.exports = router;
