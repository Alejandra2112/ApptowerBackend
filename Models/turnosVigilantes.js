const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const Vigilante = require('../Models/vigilantes'); 


const Turnos = sequelize.define('turnos', {
  idturno: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true,
    field: 'idturno', 
  },
  idvigilante: {
    type: DataTypes.INTEGER,
    field: 'idvigilante',
    allowNull: false,  
  },
  inicio: {
    type: DataTypes.DATE,
    field: 'inicio', 
  },
  fin: {
    type: DataTypes.DATE,
    field: 'fin', 
  },
}, {
  timestamps: false, 
});

Turnos.belongsTo(Vigilante, { 
    foreignKey: 'idvigilante', // Debe coincidir con el campo en la tabla Usuarios
    targetKey: 'idvigilante', // Debe coincidir con el campo en la tabla Roles
  });
  
module.exports = Turnos;

