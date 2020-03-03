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
        try {
            let page = (req.body.page - 1);
            let limit = req.body.limit;
            let promises = [
                findUser(page, limit, ),
                AddUserGroup.find().countDocuments()
            ];
            Promise.all(promises).then(data => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'user data get successfully',
                    result: data[0],
                    total: data[1]
                })
            })
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error.message
            })
        }
    },

    getMoneyData: async (req, res) => {
        let {
            body
        } = req;
        var total;
        try {
            if (body.Total < body.all) {
                total = body.all - body.Total;
            } else if (body.Total > body.all) {
                total = body.Total - body.all;
            } else {
                total = body.Total;
            }
            AddUserGroup.findOneAndUpdate({
                'email': body.email
            }, {
                $set: {
                    'Total': total,
                    // 'all': body.all,

                }
            }).then((result) => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'money added successfully',
                    result: result
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

async function findUser(skip, limit) {
    let obj = {};
    let agg = [];
    if (limit) {
        agg.push({
            $skip: limit * skip
        }, {
            $limit: limit
        });
    }

    let users = await AddUserGroup.aggregate(agg);
    agg = [];
    return users;
}

module.exports = user;