const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const RolPermiso = require('../Models/rol_permiso');
const Permisos = require('../Models/permisos');


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

  Roles.belongsToMany(Permisos, { through: RolPermiso, foreignKey: 'idrol', otherKey: 'idpermiso' });




  
  module.exports = Roles;
  