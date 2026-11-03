require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const cors = require("cors")

const app = express(); 

app.use(logger('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(__dirname + "/public"))

app.use(passport.initialize());

require('./app/auth/passport')
app.use(require('./app/auth/routes'))
app.use(require('./app/resume/routes')) 
app.use(require('./app/vacancy/routes')) 
app.use(require('./app/applies/routes')) 
app.use(require('./app/certificate/routes'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
}); 

