const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const Usuario = require('../Models/usuario');
const Reservas = require('../Models/reservas');

const Reservasparqueadero = sequelize.define('reservasparqueadero', {

    idreservasparqueadero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idreservaparqueadero', 
    },

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

    idparqueadero: {
        type: DataTypes.INTEGER,
        field: 'idparqueadero',
    },

    idvehiculo: {
        type: DataTypes.INTEGER,
        field: 'idvehiculo',
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
}
);

Reservasespacio.belongsTo(Usuario, {
foreignKey: 'idusuario',
targetKey: 'idusuario',
}); 
Reservasespacio.belongsTo(Reservas, { 
foreignKey: 'idreservas', 
targetKey: 'idreservas', 
});
Reservasespacio.belongsTo(Parqueadero,{
foreignKey: 'idparqueadero',
targetKey: 'idparqueadero',
});
Reservasespacio.belongsTo(Vehiculo,{
foreignKey: 'idvehiculo',
targetKey: 'idvehiculo',
});
module.exports = Reservasparqueadero;