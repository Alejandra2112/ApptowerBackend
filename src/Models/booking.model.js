const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const UserModel = require('./users.model');
const SpacesModel = require('./spaces.model');

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
  iduser: {
    type: DataTypes.INTEGER,
    field: 'iduser',
    required: true,

  },
  bookingdate: {
    type: DataTypes.DATE,
    field: 'bookingdate',
    required: true,

  },
  amount: {
    type: DataTypes.INTEGER,
    field: 'amount',
    required: true,

  },
  status: {
    type: DataTypes.ENUM, values: ['pendiente', 'cancelado', 'activo', 'finalizado', 'por pagar', 'pagado'],
    required: true,
  },
  finalDate: {
    type: DataTypes.DATE,
    field: 'finalDate',
    required: true,

  },
},
  //AGREGAR CANTIDAD
  //FECHA FINAL
  //ESTATUS
  /* 
    pendiente
    cancelado
    activo
    finalizado



    por pagar
    pagado
  */
  {
    timestamps: true,
  });
Booking.belongsTo(SpacesModel, {
  foreignKey: 'idSpace',
  targetKey: 'idSpace',
});
Booking.belongsTo(UserModel, {
  foreignKey: 'iduser',
  targetKey: 'iduser',
});

module.exports = Booking;
