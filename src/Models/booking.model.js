const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 

const User = require('./users.model');
const Space = require('./spaces.model');

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
  },
  iduser: {
    type: DataTypes.INTEGER,
    field: 'iduser',
  },
  bookingtype: {
      type: DataTypes.INTEGER,
      field: 'bookingtype',
  },
  bookingdate: {
    type: DataTypes.DATE,
    field: 'bookingdate', 
  },
  amount: {
    type: DataTypes.INTEGER,
    field: 'amount', 
  },
  status: {
    type: DataTypes.STRING,
    field: 'status', 
  },
  finalDate: {
    type: DataTypes.DATE,
    field: 'finalDate', 
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
Booking.belongsTo(Space, {
  foreignKey: 'idSpace', 
  targetKey: 'idSpace', 
});
Booking.belongsTo(User, {
  foreignKey: 'iduser', 
  targetKey: 'iduser', 
});

module.exports = Booking;
  