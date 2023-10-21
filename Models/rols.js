const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const rolsPermissions = require('./rols_permissions');
const Permissions = require('./permissions');


const Rols = sequelize.define('roles', {
    idrol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idrol', 
    },
    namerol: {
      type: DataTypes.STRING,
      field: 'nombrerol',
    },
    description: {
      type: DataTypes.STRING,
      field: 'descripcion', 
    },
    state: {
      type: DataTypes.STRING,
      field: 'estado', 
      validate: {
        isIn: [['Activo', 'Inactivo']], 
      },
      defaultValue: 'Activo', 
    },
  },
  );

  Rols.belongsToMany(Permissions, { through: rolsPermissions, foreignKey: 'idrol', otherKey: 'idpermiso' });

  module.exports = Rols;
  