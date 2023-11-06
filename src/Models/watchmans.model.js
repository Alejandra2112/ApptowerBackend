const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const Watchman = sequelize.define('watchmans', {
  idwatchman: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idwatchman',
  },
  namewatchman: {
    type: DataTypes.STRING,
    field: 'namewatchman',
  },
  lastnamewatchman: {
    type: DataTypes.STRING,
    field: 'lastnamewatchman',

  },
  documentType: {
    type: DataTypes.STRING,
    field: 'documentType',
  },
  document: {
    type: DataTypes.STRING,
    field: 'document',
    unique: true,
    unique: {
      msg: 'El documento ya se encuentra asignado a un vigilante'
    },
  },
  phone: {
    type: DataTypes.STRING,
    field: 'phone',
  },
  email: {
    type: DataTypes.STRING,
    field: 'email',
  },
  dateOfbirth: {
    type: DataTypes.DATE,
    field: 'dateOfbirth',
  },
  state: {
    type: DataTypes.STRING,
    field: 'state',
    validate: {
      isIn: [['Activo', 'Inactivo']],
    },
    defaultValue: 'Activo'
  },
});


module.exports = Watchman

