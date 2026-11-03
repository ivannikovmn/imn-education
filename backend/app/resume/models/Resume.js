const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db') //Импортируйте настройки подключения к базе данных

const User = require('../../auth/User')

const Resume = sequelize.define('Resume', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
});

Resume.belongsTo(User, { foreignKey: 'userId' }); // Определяем внешний ключ 'roleId'

module.exports = Resume;