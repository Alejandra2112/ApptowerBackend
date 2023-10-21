const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 

const Watchman = sequelize.define('vigilantes',{
    idwatchman: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        field: 'idvigilante', 
      },
      namewatchman: {
        type: DataTypes.STRING,
        field: 'nombrevigilante',
      },
      lastnamewatchman: {
        type: DataTypes.STRING,
        field: 'apellidovigilante', 
        
      },
      documentType: {
        type: DataTypes.STRING,
        field: 'tipodocumento', 
      },
      document: {
        type: DataTypes.STRING,
        field: 'documento',
        unique: true, 
    
      },
      phone: {
        type: DataTypes.STRING,
        field: 'telefono', 
      },
      email: {
        type: DataTypes.STRING,
        field: 'correo', 
      },
      dateOfbirth: {
        type: DataTypes.DATE,
        field: 'fechanacimiento',
      },
      state: {
        type: DataTypes.STRING,
        field: 'estado', 
        validate: {
          isIn: [['Activo', 'Inactivo']], 
        },
        defaultValue: 'Activo', 
      },
    });

    

module.exports = Watchman