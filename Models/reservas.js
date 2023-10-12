const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const Usuario = require('../Models/usuario');
const Residentes = require('../Models/residentes');


const Reservas = sequelize.define('reservas', {
    idreservas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idreservas', 
    },
    idusuario: {
      type: DataTypes.INTEGER,
      field: 'idusuario',
    },
    idresidentes: {
        type: DataTypes.INTEGER,
        field: 'idresidentes',
      },
    tiporeservas: {
        type: DataTypes.INTEGER,
        field: 'tiporeservas',
    },
    fechareserva: {
      type: DataTypes.DATE,
      field: 'fechareserva', 
    }
  },
  {
    timestamps: false, 
  });
  Reservas.belongsTo(Usuario, { //muchos usuarios a un rol o si no es hasmany
    foreignKey: 'idusuario', // Debe coincidir con el campo en la tabla Usuarios
    targetKey: 'idusuario', // Debe coincidir con el campo en la tabla Roles
  }); 
  Reservas.belongsTo(Residentes, { //muchos usuarios a un rol o si no es hasmany
    foreignKey: 'idresidentes', // Debe coincidir con el campo en la tabla Usuarios
    targetKey: 'idresidentes', // Debe coincidir con el campo en la tabla Roles
  }); 
  module.exports = Reservas;
  