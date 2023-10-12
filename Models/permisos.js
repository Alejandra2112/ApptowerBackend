const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const Permiso = sequelize.define('Permiso', {
  idPermiso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  permiso: {
    type: DataTypes.STRING,
  },
});

module.exports = Permiso;
