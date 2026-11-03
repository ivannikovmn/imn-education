const express = require('express')
const router = express.Router();
const passport = require('passport')
const {createApply, getEmployeeAplies, deleteApply, acceptEmployee, declineEmployee, getVacancyApplies} = require('./contollers')
const {isEmployee, isManager} = require('../auth/middlewares')
const {validateApply, isAuthorOfApply, isApplyExists} = require('./middlewares')
const {isAuthorVacancy} = require('../vacancy/middlewares')

router.post('/api/applies', passport.authenticate('jwt', { session: false }), isEmployee, validateApply, createApply)
router.get('/api/applies/employee', passport.authenticate('jwt', { session: false }), isEmployee, getEmployeeAplies)
router.delete('/api/applies/:id', passport.authenticate('jwt', { session: false }), isEmployee, isAuthorOfApply, deleteApply)
router.put('/api/applies/accept/employee', passport.authenticate('jwt', { session: false }), isManager, isApplyExists, isAuthorVacancy, acceptEmployee)
router.put('/api/applies/decline/employee', passport.authenticate('jwt', { session: false }), isManager, isApplyExists, isAuthorVacancy, declineEmployee)
router.get('/api/applies/vacancy/:id', passport.authenticate('jwt', { session: false }), isManager, isAuthorVacancy, getVacancyApplies)

module.exports = router;