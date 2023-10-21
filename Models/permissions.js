const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const Permissions = sequelize.define('permisos', {
  idpermission: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idpermiso', 
  },
  permission: {
    type: DataTypes.STRING,
    field: 'permiso', 
  },
},{
  timestamps: false, 
});


module.exports = Permissions;
