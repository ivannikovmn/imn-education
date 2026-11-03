const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db') //Импортируйте настройки подключения к базе данных
const Resume = require('../resume/models/Resume')
const Vacancy = require('../vacancy/models/Vacancy')

const Apply = sequelize.define('Apply', {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
    
});

Apply.belongsTo(Resume, { foreignKey: 'resumeId', as: 'resume'  }); // Определяем внешний ключ 'roleId'
Apply.belongsTo(Vacancy, { foreignKey: 'vacancyId', as: 'vacancy'})

module.exports = Apply;