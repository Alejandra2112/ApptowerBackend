const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 


const Roles = sequelize.define('roles', {
    idrol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idrol', 
    },
    nombrerol: {
      type: DataTypes.STRING,
      field: 'nombrerol',
    },
    descripcion: {
      type: DataTypes.STRING,
      field: 'descripcion', 
    },
    estado: {
      type: DataTypes.STRING,
      field: 'estado', 
      validate: {
        isIn: [['ACTIVO', 'INACTIVO']], 
      },
      defaultValue: 'ACTIVO', 
    },
  },
  {
    timestamps: false, 
  });

  Roles.belongsToMany(Permisos, { through: 'Rol_Permiso', foreignKey: 'idRol' });
  
  module.exports = Roles;
  