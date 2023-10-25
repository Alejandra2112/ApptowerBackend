const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config'); 
const User = require('./users.model');

const Watchman = sequelize.define('watchmans',{
    idwatchman: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        field: 'idwatchman', 
      },
      namewatchman: {
        type: DataTypes.STRING,
        field: 'namewatchman',
      },
      lastnamewatchman: {
        type: DataTypes.STRING,
        field: 'lastnamewatchman', 
        
      },
      documentType: {
        type: DataTypes.STRING,
        field: 'documentType', 
      },
      document: {
        type: DataTypes.STRING,
        field: 'document',
        unique: true, 
    
      },
      phone: {
        type: DataTypes.STRING,
        field: 'phone', 
      },
      email: {
        type: DataTypes.STRING,
        field: 'email', 
      },
      dateOfbirth: {
        type: DataTypes.DATE,
        field: 'dateOfbirth',
      },
      state: {
        type: DataTypes.STRING,
        field: 'state', 
        validate: {
          isIn: [['Activo', 'Inactivo']], 
        },
        defaultValue: 'Activo', 
      },
    });

    Watchman.afterUpdate(async (watchman) => {
      const existinguser = await User.findOne({ where: { document: watchman.document } });
      console.log(existinguser)
      if (existinguser) {
        await existinguser.update({
          name: watchman.namewatchman,
          lastname: watchman.lastnamewatchman,
          documentType: watchman.documentType,
          phone: watchman.phone,
          email: watchman.email,
          state: watchman.state,
        });
      }});
  
module.exports = Watchman

