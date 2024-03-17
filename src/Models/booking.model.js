const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const SpacesModel = require('./spaces.model');
const ResidentModel = require('./resident.model');

const Booking = sequelize.define('booking', {
  idbooking: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idbooking',
  },
  idSpace: {
    type: DataTypes.INTEGER,
    field: 'idSpace',
    required: true,

  },
  idResident: {
    type: DataTypes.INTEGER,
    field: 'idResident',
    required: true,

  },
  StartDateBooking: {
    type: DataTypes.DATE,
    field: 'StartDateBooking',
    required: true,

  },

  StartTimeBooking: {
    type: DataTypes.TIME,
    field: 'StartTimeBooking',
    required: true,

  },

  EndTimeBooking: {
    type: DataTypes.TIME,
    field: 'EndTimeBooking',
    required: true,

  },

  amountPeople: {
    type: DataTypes.INTEGER,
    field: 'amountPeople',
    required: true,

  },
  status: {
    type: DataTypes.STRING,
    field: 'status',
    validate: {
      isIn: [['Por revisar', 'Cancelado', 'Aprobado']],
    },
    defaultValue: 'Por revisar',
  },

},
  {
    timestamps: false,
  });
Booking.belongsTo(SpacesModel, {
  foreignKey: 'idSpace',
  targetKey: 'idSpace',
});
Booking.belongsTo(ResidentModel, {
  foreignKey: 'idResident',
  targetKey: 'idResident',
});

module.exports = Booking;
