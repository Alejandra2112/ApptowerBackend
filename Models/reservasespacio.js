const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const Usuario = require('../Models/usuario');
const Residentes = require('../Models/residentes');
const Reservas = require('../Models/reservas');
const Espacios = require('../Models/espacios');

const Reservasespacio = sequelize.define('reservasespacio', {

    idreservasespacio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idreservasespacio', 
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

    idespacio: {
        type: DataTypes.INTEGER,
        field: 'idespacio',
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
}
);

Reservasespacio.belongsTo(Usuario, {
foreignKey: 'idusuario',
targetKey: 'idusuario',
}); 
Reservasespacio.belongsTo(Residentes, { 
foreignKey: 'idresidentes', 
targetKey: 'idresidentes', 
});
Reservasespacio.belongsTo(Reservas,{
foreignKey: 'idresidentes',
targetKey: 'idresidentes',
});
Reservasespacio.belongsTo(Espacios,{
foreignKey: 'idespacio',
targetKey: 'idespacio',
});
module.exports = Reservasespacio;