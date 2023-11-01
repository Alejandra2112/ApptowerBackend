const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');


const rolsPermissions = sequelize.define('permissionRols', {
  idrolpermission: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idpermissionRols',
  },
  idrole: {
    type: DataTypes.INTEGER,
    field: 'idrole'
  },
  idpermission: {
    type: DataTypes.INTEGER,
    field: 'idpermission',
  },
  idprivilege: {
    type: DataTypes.INTEGER,
    field: 'idprivilege',
  },
});

module.exports = rolsPermissions;
