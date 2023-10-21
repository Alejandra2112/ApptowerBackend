const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const rolsPermissions = sequelize.define('rol_permiso', { 
  idrol_permission: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idrol_permiso',
  },
  idrol: {
    type: DataTypes.INTEGER,
  },
  idpermission: {
    type: DataTypes.INTEGER,
    field: 'idpermiso',
  },
}, {
  timestamps: false,
  tableName: 'rol_permiso', 
});


module.exports = rolsPermissions;
