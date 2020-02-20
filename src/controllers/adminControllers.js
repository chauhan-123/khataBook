const adminModel = require('../models/adminModels');
const adminGroup = adminModel.adminPanel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../model/config');
const admin = {
    getAdminRegistrationData: (req, res) => {
        let {
            body
        } = req;
        try {
            adminGroup.findOne({
                $or: [{
                        'mobileNumber': req.body.mobileNumber
                    },
                    {
                        'email': req.body.email,
                    },
                ]
            }, async (error, user) => {
                var emailToValidate = req.body.email;
                const emailRegexp = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
                if (emailRegexp.test(emailToValidate)) {
                    if (error) {
                        return res.status(401).json({
                            statusCode: 401,
                            message: 'something went wrong......'
                        });
                    }
                    if (user) {
                        let message = '';
                        user.email == body.email ? message = 'email already exists' : message = 'mobile number already exists';
                        return res.status(400).json({
                            statusCode: 400,
                            message
                        })
                    } else {
                        try {
                            let password = await bcrypt.hash(body.password, 12);
                            var data = {
                                adminName: body.adminName,
                                adminBusinessType: body.adminBusinessType,
                                email: body.email,
                                mobileNumber: body.mobileNumber,
                                password: password
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
                                error: error
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
    },

    getAdminLoginData: (req, res) => {
        let {
            body
        } = req;
        try {
            adminGroup.find({
                $or: [{
                        'email': req.body.email
                    },
                    {
                        'password': req.body.password
                    },
                ]
            }).then((user, error) => {
                if (error) {
                    return res.status(401).json({
                        statusCode: 401,
                        message: 'not a registered user'
                    })
                }
                if (!user[0]) {
                    let message = '';
                    if (user.email != body.email) {
                        message = 'email is not valid'
                    }
                    if (user.password != body.password) {
                        message = 'first signup '
                    }
                    return res.status(401).json({
                        statusCode: 401,
                        message
                    });
                }
                var passwordIsValid = bcrypt.compareSync(body.password, user[0].password);
                if (!passwordIsValid) {
                    return res.status(402).json({
                        statusCode: 402,
                        message: ' your password is not match with registered password ....'
                    });
                }
                var token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    adminName: user.adminName
                }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).json({
                    statusCode: 200,
                    message: 'successfully logged in',
                    result: token
                });
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