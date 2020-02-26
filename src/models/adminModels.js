var mongoose = require('mongoose');

var adminPanelSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, 'adminName field is required'],
        trim: true
    },
    adminBusinessType: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email field is required'],
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 100
    },
    mobileNumber: {
        type: Number,
        required: [true, 'mobile number field is required'],
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: [true, 'password field is required'],
        minlength: 6,
        maxlength: 100
    },
    time: {
        type: Date,
        default: Date.now
    },
    resetPasswordLinkExpired: {
        type: Boolean,
        default: true
    },
})

var adminPanel = mongoose.model("adminPanel", adminPanelSchema)


module.exports.adminPanel = adminPanel;