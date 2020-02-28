const router = require('express').Router();
const userCtrl = require('../controllers/userControllers');
const auth = require('../middleware/auth');

router.post('/addUser', auth, userCtrl.getUserData);
router.get('/getUserDetails', userCtrl.getUserDetails);
router.post('/addMoney', userCtrl.getMoneyData);

module.exports = router;