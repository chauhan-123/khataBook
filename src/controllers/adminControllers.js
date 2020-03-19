const adminModel = require('../models/adminModels');
const adminGroup = adminModel.adminPanel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../model/config');
var nodemailer = require('nodemailer');

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
            adminGroup.findOne({
                email: body.email
            }).then((user, error) => {
                if (error) {
                    return res.status(500).json({
                        message: error.message
                    })
                }
                if (!user) {
                    res.status(500).json({
                        statusCode: 500,
                        message: 'not a authenticated user',
                    });
                }
                if (user) {
                    var passwordIsValid = bcrypt.compareSync(body.password, user.password);
                    if (!passwordIsValid) {
                        return res.status(402).json({
                            statusCode: 402,
                            message: ' your password is not match with registered password ....'
                        });
                    }
                    console.log(user, user[0])
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
                        result: user,
                        token: token
                    });
                }

            })
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error
            })
        }
    },

    getAdminforgotPasswordData: (req, res) => {
        try {
            let {
                body
            } = req;
            adminGroup.find({
                'email': body.email
            }).then((user, error) => {
                if (error) {
                    return res.status(500).json({
                        message: error.message
                    })
                }
                if (!user[0]) {

                    return res.status(400).json({
                        statusCode: 400,
                        message: 'email id is not registered'
                    })
                }

                if (user) {
                    var token = jwt.sign({
                        id: user[0]._id,
                        email: user[0].email,
                    }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'chauhan1995sumit@gmail.com',
                            pass: 'Sumit@12345'
                        }
                    });
                    var mailOptions = {
                        from: 'chauhan1995sumit@gmail.com',
                        to: req.body.email,
                        text: 'resend email',
                        subject: 'Sending Email using Node.js',
                        html: `<p>Click <a href="http://localhost:4200/reset_password?token=${token}">sendToken=${token}</a> to reset your password</p>`
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    var time = new Date();
                    adminGroup.findOneAndUpdate({
                        'email': body.email
                    }, {
                        $set: {
                            'time': time,
                            resetPasswordLinkExpired: true,

                        }
                    }).then((result) => {
                        res.status(200).json({
                            statusCode: 200,
                            message: 'Reset pasword link send to your email..',
                            result: result
                        });
                    }).catch(error => res.status(500).json({
                        error: error
                    }))
                }

            })

        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error
            })
        }


    },

    getAdminresetPasswordData: (req, res) => {
        let {
            body
        } = req;

        try {
            adminGroup.find({
                'email': body.email
            }, async (error, user) => {
                if (user[0].resetPasswordLinkExpired == true) {
                    var time = new Date();
                    var diffMs = (time - user[0].time); // millisecond 
                    var diffDays = Math.floor(diffMs / 86400000); // days
                    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                    var diffSec = diffMins / 1000;
                    if (diffMins >= 5) { // thats is 5 minute..
                        res.status(500).json({
                            statusCode: 500,
                            message: 'your password time is expired....'
                        })
                    } else {
                        var password = body.password;
                        var confirmPassword = body.confirm_password;
                        if (password !== confirmPassword) {
                            res.status(400).json({
                                statusCode: 400,
                                message: 'password not match with confirm password'
                            });
                        } else {
                            let password2 = await bcrypt.hash(body.password, 12);
                            adminGroup.findOneAndUpdate({
                                email: user[0].email
                            }, {
                                $set: {
                                    password: password2,
                                    resetPasswordLinkExpired: false,
                                }
                            }).then((result) => {
                                res.status(200).json({
                                    statusCode: 200,
                                    message: 'you are login with new password with registered email.... '
                                })
                            })
                        }
                    }
                } else {
                    res.status(400).json({
                        statusCode: 400,
                        message: 'only once time link is valid '
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

    getFacebookData: (req, res) => {
        console.log(req.body);
        if (req.body.status == 'connected') {
            var token = jwt.sign({}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).json({
                statusCode: 200,
                message: 'successfully logged in',
                token: token
            });
        }
    }
}

module.exports = admin;