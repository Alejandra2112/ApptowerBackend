  const { Sequelize, DataTypes } = require('sequelize');
  const sequelize = require('../Database/config'); 
const Permissions = require('../Models/permissions.model');
const rolsPermissions = require('./rolsPermissions.model');


  const Rols = sequelize.define('rols', {
      idrole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idrole', 
      },
      namerole: {
        type: DataTypes.STRING,
        field: 'namerole',
      },
      description: {
        type: DataTypes.STRING,
        field: 'description', 
      },
      state: {
        type: DataTypes.STRING,
        field: 'state', 
        validate: {
          isIn: [['Activo', 'Inactivo']], 
        },  
        defaultValue: 'Activo', 
      },
    },
    );

//Relations
Rols.belongsToMany(Permissions, {
  through: rolsPermissions, 
  foreignKey: 'idrole',
  otherKey: 'idpermission',
});
    
    module.exports = Rols;
    