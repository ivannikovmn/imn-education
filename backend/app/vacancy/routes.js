const express = require('express')
const router = express.Router();
const {getMyVacancies, createVacancy, getVacancy, deleteVacancy, editVacancy} = require('./contollers')
const passport = require('passport')
const {isManager} = require('../auth/middlewares')
const {validateVacancy, isAuthorVacancy} = require('./middlewares')
const {upload} = require('./utils')

router.post('/api/vacancy', passport.authenticate('jwt', { session: false }), isManager, upload.single('branding_photo'), validateVacancy, createVacancy)
router.get('/api/vacancy', passport.authenticate('jwt', { session: false }), isManager, getMyVacancies)
router.get('/api/vacancy/:id', getVacancy)
router.delete('/api/vacancy/:id', passport.authenticate('jwt', { session: false }), isManager, isAuthorVacancy, deleteVacancy)
router.put('/api/vacancy', passport.authenticate('jwt', { session: false }), isManager, upload.single('branding_photo'), isAuthorVacancy, validateVacancy, editVacancy)

module.exports = router;