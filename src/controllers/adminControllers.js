const adminModel = require('../models/adminModels');
const adminGroup = adminModel.adminPanel;

const admin = {
    getAdminData: (req, res) => {
        try {
            adminGroup.findOne({
                'email': req.body.email
            }, async (user, err) => {
                var emailToValidate = req.body.email;
                const emailRegexp = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
                if (emailRegexp.test(emailToValidate)) {
                    if (err) res.status(401).json({
                        statusCode: 401,
                        message: 'something went wrong......'
                    });
                    if (user) res.status(400).json({
                        statusCode: 400,
                        message: 'your are alredy registered this email.......'
                    })
                    else {
                        try {
                            var data = {
                                adminName: req.body.adminName,
                                adminBusinessType: req.body.adminBusinessType,
                                email: req.body.email,
                                mobileNumber: req.body.mobileNumber
                            }
                            var myData = new adminGroup(data);
                            await myData.save().then(item => {
                                res.status(200).json({
                                    statusCode: 200,
                                    message: 'item saved to the database',
                                    result: item
                                })
                            })
                        } catch (error) {
                            res.status(500).json({
                                statusCode: 500,
                                error: error.errors    
                            })
                        }
                    }
                } else {
                    res.status(500).json({
                        statusCode: 500,
                        message: 'wrong email??????????????',
                        error: error
                    })
                }
            })
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error
            })
        }
    }
}

module.exports = admin;