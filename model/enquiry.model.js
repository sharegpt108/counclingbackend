const mongoose = require('mongoose')

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    birthTime: {
        type: String,
        required: true
    },
    birthPlace: {
        type: String,
        required: true
    },
    plan:{
        type: String,
        required: true,
        enum: ['free', 'basic', 'premium'], // Only these values allowed
        default: 'free'
    }
}, {timestamps: true})

const Enquiry = mongoose.model('Enquiry', enquirySchema)
module.exports = Enquiry;
