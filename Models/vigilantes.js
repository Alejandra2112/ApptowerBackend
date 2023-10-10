const { Sequelize, DataTypes } = require('sequelize');
const sequelizeVigilante = require('../Database/config'); 

const Vigilante = sequelizeVigilante.define('vigilantes',{
    idvigilante: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        field: 'idvigilante', 
      },
      nombrevigilante: {
        type: DataTypes.STRING,
        field: 'nombrevigilante',
        allowNull: false, 
      },
      apellidovigilante: {
        type: DataTypes.STRING,
        field: 'apellidovigilante', 
        allowNull: false, 
      },
      tipodocumento: {
        type: DataTypes.STRING,
        field: 'tipodocumento', 
      },
      documento: {
        type: DataTypes.STRING,
        field: 'documento',
        unique: true, 
        allowNull: false, 
      },
      telefono: {
        type: DataTypes.STRING,
        field: 'telefono', 
      },
      correo: {
        type: DataTypes.STRING,
        field: 'correo', 
      },
      entrada: {
        type: DataTypes.DATE,
        field: 'entrada',
        allowNull: true,
        
      },
      salida: {
        type: DataTypes.DATE,
        field: 'salida',
        allowNull: true,
        
      },
      fechanacimiento: {
        type: DataTypes.DATE,
        field: 'fechanacimiento',
      },
      estado: {
        type: DataTypes.STRING,
        field: 'estado', 
        validate: {
          isIn: [['ACTIVO', 'INACTIVO']], 
        },
        defaultValue: 'ACTIVO', 
      },
    }, {
      timestamps: false, 
    });


module.exports = Vigilante