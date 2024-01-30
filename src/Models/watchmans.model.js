const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const EnterpriseSecurity = require('./enterprice.security.model');
const UserModel = require('./users.model');

const Watchman = sequelize.define('watchmans', {
  idwatchman: {

    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idwatchman',
  },
  idEnterpriseSecurity: {
    type: DataTypes.INTEGER,
    field: 'idEnterpriseSecurity',

  },
  iduser: {

    type: DataTypes.INTEGER,
    field: "iduser"
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





Watchman.belongsTo(EnterpriseSecurity, { foreignKey: 'idEnterpriseSecurity', targetKey: 'idEnterpriseSecurity', });




module.exports = Watchman

