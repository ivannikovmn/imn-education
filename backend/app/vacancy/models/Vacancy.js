const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const User = require('../../auth/User');
const Company = require('../../auth/Company');

const Vacancy = sequelize.define('Vacancy', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  about_company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  branding_photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  materials: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
  },
});

Vacancy.belongsTo(User, { foreignKey: 'userId' });
Vacancy.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

module.exports = Vacancy;
