var mongoose = require('mongoose');

var AddUserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'adminName field is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email field is required'],
        trim: true,
        unique: true,
        maxlength: 100
    },
    mobileNumber: {
        type: Number,
        required: [true, 'mobile number field is required'],
        unique: true,
        maxlength: 10
    },
    address: {
        type: String,
        required: [true, 'address field is required'],
    },
    time: {
        type: Date,
        default: Date.now
    },
    Total: {
        type: Number,
        default: null
    },

})

var productsellSchema = new mongoose.Schema({
    email: {
        type: String
    },
    amount: {
        type: Number
    },
    giveMoney: {
        type: Number
    },
    currentDate: {
        type: Date,
        default: Date.now
    },
    promiseDate: {
        type: Date,
        default: Date.now
    },
    balance: {
        type: Number,
        default: null
    },
    balanceType: {
        type: Boolean,
        default: true
    }
})

var userPanel = mongoose.model("userPanel", AddUserSchema);
var sellProduct = mongoose.model("sellProduct", productsellSchema);


module.exports.userPanel = userPanel;
module.exports.sellProduct = sellProduct;