const router = require('express').Router();
const adminCtrl = require('../controllers/adminControllers');
const a =  require('../controllers/adminControllers')

router.post('/register', adminCtrl.getAdminRegistrationData);
router.post('/login' , adminCtrl.getAdminLoginData)


module.exports = router;
