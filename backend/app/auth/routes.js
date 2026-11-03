const express = require('express')
const router = express.Router();
const {SendVerificationEmail, verifyCode, signUp, logIn} = require('./contollers')
const {validateSignUp} = require('./middlewares')
const {upload} = require('./utils')

router.post('/api/auth/sendmail', SendVerificationEmail)
router.post('/api/auth/verifycode', verifyCode)
router.post('/api/auth/signup', upload.single('company_logo'), validateSignUp, signUp)
router.post('/api/auth/login', logIn)

module.exports = router;