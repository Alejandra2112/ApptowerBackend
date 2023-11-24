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
  start: {
    type: DataTypes.DATE,
    field: 'start',
  },
  end: {
    type: DataTypes.DATE,
    field: 'end',
  },
  state: {
    type: DataTypes.STRING,
    field: 'state',
    validate: {
      isIn: [['Activo', 'Inactivo']],
    }
  }
}, {
  timestamps: false,
});

guardShifts.belongsTo(Watchman, {
  foreignKey: 'idwatchman',
  targetKey: 'idwatchman',
});

module.exports = guardShifts;

