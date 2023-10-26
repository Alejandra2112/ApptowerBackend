const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const usersforResidents = sequelize.define('usersforResidents', { 
  idusersforResidents: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idpermissionRols',
  },
  iduser: {
    type: DataTypes.INTEGER,
    field: 'iduser'
    
  },
  idResident: {
    type: DataTypes.INTEGER,
    field: 'idResident',
  },
});

module.exports = usersforResidents;

