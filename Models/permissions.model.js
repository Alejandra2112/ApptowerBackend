const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const permissionPrivileges = require ('../Models/permissionPrivileges.model');
const Privileges = require('./privileges.model');

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

//Relations
Permissions.belongsToMany(Privileges, {
  through: permissionPrivileges, 
  foreignKey: 'idpermission',
  otherKey: 'idprivilege',
});


module.exports = Permissions;
