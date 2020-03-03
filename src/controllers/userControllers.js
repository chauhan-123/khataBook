const userModel = require('../models/userModel');
const AddUserGroup = userModel.userPanel;
const sellProductGroup = userModel.sellProduct;

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
    },

    getSellProductDetails: async (req, res) => {
        console.log(req.body)
        let {
            body
        } = req;
        var total;
        var Amount = 0;
        try {
            if (body.amount < body.giveMoney) {
                total = body.giveMoney - body.amount;
                balanceType = false
            } else if (body.amount > body.giveMoney) {
                total = body.amount - body.giveMoney;
                balanceType = true
            } else {
                total = body.amount;
            }
            var data = {
                email: body.email,
                amount: body.amount,
                giveMoney: body.giveMoney,
                balance: total,
                balanceType: balanceType
                // currentDate: body.currentDate,
                // promiseDate: body.promiseDate
            }
            var mydata = new sellProductGroup(data);
            let promises = [
                saveData(mydata),
                sellProductGroup.find().then((user, error) => {
                    user.forEach(element => {
                        Amount = element.balance + Amount;
                    });
                    console.log(Amount)
                })
            ]
            Promise.all(promises).then(item => {
                let data = {
                    TotalMoney: Amount,
                    result: item[0]
                }
                console.log(data, "bhai chl jaa yr")
                res.status(200).json({
                    statusCode: 200,
                    message: 'sell item added successfully',
                    total: data
                })
            })
            // await mydata.save().then(item => {
            //     res.status(200).json({
            //         statusCode: 200,
            //         message: 'sell item added successfully',
            //         result: item
            //     })
            // })


        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error
            })
        }
    },

    getUniqueSellProduct: (req, res) => {
        console.log(req.body)
        let {
            body
        } = req;
        var total;
        try {
            var page = (req.body.page - 1);
            var limit = req.body.limit;

            sellProductGroup.find({
                'email': body.email
            }).then((user, error) => {
                [
                    findUser(page, limit),
                    sellProductGroup.count().countDocuments()
                ]
                res.status(200).json({
                    statusCode: 200,
                    message: 'individual user data get successfully',
                    result: user,
                })
            })
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error.message
            })
        }
    }


}

async function saveData(mydata) {
    await mydata.save().then(item => {
        // res.status(200).json({
        //     statusCode: 200,
        //     message: 'sell item added successfully',
        //     result: item
        // })
    })
    return mydata
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