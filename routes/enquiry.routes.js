const express = require('express');
const {submitEnquiry} = require('../controller/enquiry.controller');
const router = express.Router();

router.post('/submit-enquiry', submitEnquiry);

module.exports = router;