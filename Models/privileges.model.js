const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const Privileges = sequelize.define('privileges', {
  idprivilege: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idprivilege',
  },
  privilege: {
    type: DataTypes.STRING,
    field: 'privilege',
  },
  state: {
    type: DataTypes.STRING,
    field: 'state',
    validate: {
      isIn: [['Activo', 'Inactivo']],
    },
    defaultValue: 'Inactivo',
  },
}, {
  timestamps: false,
});


module.exports = Privileges;
