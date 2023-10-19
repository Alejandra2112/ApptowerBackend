const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const Permisos = sequelize.define('permisos', {
  idpermiso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idpermiso', 
  },
  permiso: {
    type: DataTypes.STRING,
    field: 'permiso', 
  },
},{
  timestamps: false, 
});


module.exports = Permisos;
