const router = require('express').Router();
const userCtrl = require('../controllers/userControllers');
const auth = require('../middleware/auth');

router.post('/addUser', auth, userCtrl.getUserData);
router.post('/getUserDetails', auth, userCtrl.getUserDetails);
router.post('/addMoney', auth, userCtrl.getMoneyData);
router.post('/sellProductDetails', auth, userCtrl.getSellProductDetails);
router.post('/getuniqueUserMoneyDetail', auth, userCtrl.getUniqueSellProduct);
router.post('/getUserFilter', auth, userCtrl.getUserFilterDetails)

module.exports = router;