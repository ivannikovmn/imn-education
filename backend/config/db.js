const { Sequelize } = require('sequelize');
const dbConf = require('./config');

const environment =
    process.env.NODE_ENV === 'production'
        ? dbConf.production
        : dbConf.development;

const sequelize = new Sequelize(
    environment.database,
    environment.username,
    environment.password,
    {
        host: environment.host,
        dialect: environment.dialect,
        port: environment.port,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;