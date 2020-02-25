const router = require('express').Router();
const adminCtrl = require('../controllers/adminControllers');
const a = require('../controllers/adminControllers')

router.post('/register', adminCtrl.getAdminRegistrationData);
router.post('/login', adminCtrl.getAdminLoginData);
router.post('/forgot_password', adminCtrl.getAdminforgotPasswordData);
router.post('/reset_password', adminCtrl.getAdminresetPasswordData);


module.exports = router;