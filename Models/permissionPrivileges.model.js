const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const permissionPrivileges = sequelize.define('permissionPrivileges', { 
  idpermissionPrivileges: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idpermissionPrivileges',
  },
  idpermission: {
    type: DataTypes.INTEGER,
    field: 'idpermission'
    
  },
  idprivilege: {
    type: DataTypes.INTEGER,
    field: 'idprivilege',
  },
});

module.exports = permissionPrivileges;

