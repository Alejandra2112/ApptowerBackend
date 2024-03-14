const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const Watchman = require('./watchmans.model');



const guardShifts = sequelize.define('guardShifts', {
  idshifts: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idshifts',
  },
  idwatchman: {
    type: DataTypes.INTEGER,
    field: 'idwatchman',
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    field: 'date',
  },
  start: {
    type: DataTypes.TIME,
    field: 'start',
  },
  end: {
    type: DataTypes.TIME,
    field: 'end',
  },
}, {
  timestamps: false,
});

guardShifts.belongsTo(Watchman, {
  foreignKey: 'idwatchman',
  targetKey: 'idwatchman',
});



module.exports = guardShifts;

