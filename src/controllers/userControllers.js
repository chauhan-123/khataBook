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
            let search = req.body.search;
            let promises = [
                findUser(page, limit, search),
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
        let {
            body
        } = req;
        var total;
        var Amount = 0;
        var Amount1 = 0;
        var Amount2 = 0;
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
                balanceType: balanceType,
                currentDate: body.currentDate,
                promiseDate: body.promiseDate
            }
            var mydata = new sellProductGroup(data);
            let promises = [
                saveData(mydata).then((data, error) => {
                    sellProductGroup.find().then((user, error) => {
                        user.forEach(element => {
                            if (element.balanceType == true && element.email == body.email) {
                                Amount1 = element.balance + Amount1;
                            }
                            if (element.balanceType == false && element.email == body.email) {
                                Amount2 = element.balance + Amount2;
                            }
                        });
                        if (Amount1 > Amount2) {
                            Amount = Amount1 - Amount2;
                            TOTAL = true;
                        } else {
                            Amount = Amount2 - Amount1;
                            TOTAL = false
                        }
                        AddUserGroup.findOneAndUpdate({
                            'email': body.email
                        }, {
                            $set: {
                                'Total': Amount,
                                'TOTAL': TOTAL
                            }
                        }).then((result) => {
                            res.status(200).json({
                                statusCode: 200,
                                message: 'add money successfully',
                                result: result
                            });
                        }).catch(error => res.status(500).json({
                            error: error
                        }))
                    })
                })
            ]
            Promise.all(promises).then(item => {
                sellProductGroup.findOneAndUpdate({
                    'email': body.email
                }, {
                    $set: {
                        'TOTAL': Amount
                    }
                }).then((result) => {
                    res.status(200).json({
                        statusCode: 200,
                        message: 'add money successfully',
                        result: result
                    });
                }).catch(error => res.status(500).json({
                    error: error
                }))
            })
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error
            })
        }
    },

    getUniqueSellProduct: (req, res) => {
        let {
            body
        } = req;
        var total;
        try {
            var page = (req.body.page - 1);
            var limit = req.body.limit;
            var email = body.email;
            let promises = [
                findUniqueUser(email).skip(limit * page).limit(limit),
                sellProductGroup.find({
                    'email': body.email
                }).countDocuments()
            ];
            Promise.all(promises).then(data => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'individual data get successfully',
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

    getUserFilterDetails: (req, res) => {
        let From = req.body.from;
        let To = req.body.to;
        let promises = [
            findFilter(From, To),
            AddUserGroup.find().countDocuments()
        ]
        Promise.all(promises).then(data => {
            res.status(200).json({
                statusCode: 200,
                message: 'filter data get successfully',
                result: data[0],
                total: data[1]

            })
        })
    },

    sendPdfFileDetails: (req, res) => {
        console.log("working or not")
    }


}

async function findFilter(From, To) {
    let agg = [];
    let from = new Date(From);
    from.setDate(from.getDate() + 1);
    let to = new Date(To);
    to.setDate(to.getDate() + 1);
    if (From && To) {
        agg.push({
            $match: {
                $and: [{
                        time: {
                            $gte: new Date(from)
                        }
                    },
                    {
                        time: {
                            $lte: new Date(to)
                        }
                    }
                ]
            }
        })
    }

    let users = await AddUserGroup.aggregate(agg);
    agg = [];
    return users
}

function saveData(mydata) {
    return mydata.save()
}

function findUniqueUser(email) {
    return sellProductGroup.find({
        'email': email
    })
}

async function findUser(skip, limit, search = '') {
    let obj = {};
    var agg = [];
    if (search) {
        await AddUserGroup.find({
            "userName": {
                '$regex': search
            }
        }).skip(limit * skip).limit(limit).then((user, error) => {
            agg = user;

        })
    } else {
        await AddUserGroup.find({}).skip(limit * skip).limit(limit).then((user, error) => {
            agg = user;
        })
    }
    return agg

}



module.exports = user;