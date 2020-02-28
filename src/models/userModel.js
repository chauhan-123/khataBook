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
    // Total: {
    //     type: Number,
    //     default: null
    //     // required: [true, 'total field is required']
    // },
    // all: {
    //     type: Number,
    //     default: null
    //     // required: [true, 'All field is required']
    // }
})

var userPanel = mongoose.model("userPanel", AddUserSchema)


module.exports.userPanel = userPanel;