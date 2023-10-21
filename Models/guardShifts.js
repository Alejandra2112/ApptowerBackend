const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const Watchman = require('./watchman'); 


const guardShifts = sequelize.define('turnos', {
  idshifts: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true,
    field: 'idturno', 
  },
  idwatchman: {
    type: DataTypes.INTEGER,
    field: 'idvigilante',
    allowNull: false,  
  },
  start: {
    type: DataTypes.DATE,
    field: 'inicio', 
  },
  end: {
    type: DataTypes.DATE,
    field: 'fin', 
  },
}, {
  timestamps: false, 
});

guardShifts.belongsTo(Watchman, { 
    foreignKey: 'idwatchman', // Debe coincidir con el campo en la tabla Usuarios
    targetKey: 'idwatchman', // Debe coincidir con el campo en la tabla Roles
  });
  
module.exports = guardShifts;

