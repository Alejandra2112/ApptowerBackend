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
       
       
      },
      apellidovigilante: {
        type: DataTypes.STRING,
        field: 'apellidovigilante', 
        
      },
      tipodocumento: {
        type: DataTypes.STRING,
        field: 'tipodocumento', 
      },
      documento: {
        type: DataTypes.STRING,
        field: 'documento',
        unique: true, 
    
      },
      telefono: {
        type: DataTypes.STRING,
        field: 'telefono', 
      },
      correo: {
        type: DataTypes.STRING,
        field: 'correo', 
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