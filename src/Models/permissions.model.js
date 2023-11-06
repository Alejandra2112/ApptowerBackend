const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const rolsPermissions = require('./rolsPermissions.model');

const Permissions = sequelize.define('permissions', {
  idpermission: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idpermission',
  },
  permission: {
    type: DataTypes.STRING,
    field: 'permission',
  },
  description: {
    type: DataTypes.STRING,
    field: 'description'
  }
}, {
  timestamps: false,
});

Permissions.hasMany(rolsPermissions, {
  foreignKey: 'idpermission',
  sourceKey: 'idpermission',
});

rolsPermissions.belongsTo(Permissions, {
  foreignKey: 'idpermission',
  targetKey: 'idpermission',
})


module.exports = Permissions;