const userModel = require('../models/userModel');
const AddUserGroup = userModel.userPanel;

const user = {
    getUserData: async (req, res) => {
        let {
            body
        } = req;
        try {
            var data = {
                userName: body.userName,
                email: body.email,
                mobileNumber: body.mobileNumber,
                address: body.address
            }
            var mydata = new AddUserGroup(data);
            console.log(mydata)
            await mydata.save().then(item => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'user data saved to successfully',
                    result: item
                })
            })

        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error
            })
        }



    },

    getUserDetails: (req, res) => {
        console.log("get user details");
        try {
            AddUserGroup.find().then(item => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'user data get successfully',
                    result: item
                })
            })
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error
            })
        }
    },

    getMoneyData: (req, res) => {
        let {
            body
        } = req;
        try {
            AddUserGroup.findOneAndUpdate({
                'email': body.email
            }, {
                $set: {
                    'Total': body.Total,
                    'all': body.all,

                }
            }).then((result) => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'money added successfully',
                    result: user
                });
            }).catch(error => res.status(500).json({
                error: error
            }))

        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error
            })
        }
    }
}

module.exports = user;