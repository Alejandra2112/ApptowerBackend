const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const usersforWatchmans = sequelize.define('usersforWatchmans', {
  idusersforWatchmans: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idpermissionRols',
  },
  iduser: {
    type: DataTypes.INTEGER,
    field: 'iduser'

  },
  idwatchman: {
    type: DataTypes.INTEGER,
    field: 'idwatchman',
  },
});

module.exports = usersforWatchmans;

