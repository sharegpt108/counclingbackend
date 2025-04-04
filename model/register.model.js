const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
    },
    pincode: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'parent', 'school', 'institution', 'college', 'company/startup'], 
        set: (val) => val.toLowerCase()
    }
});

const Register = mongoose.model('Register', registerSchema)
module.exports = Register;