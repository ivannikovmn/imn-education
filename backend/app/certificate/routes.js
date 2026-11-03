const express = require('express')

const router = express.Router()

const { getCertificate } = require('./controllers')

router.get('/certificate/:userId/:vacancyId', getCertificate)

module.exports = router