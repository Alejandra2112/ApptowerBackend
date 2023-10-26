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
    description:{
      type: DataTypes.STRING,
      field: 'description'
    }
  },{
    timestamps: false, 
  });


  module.exports = Permissions;
