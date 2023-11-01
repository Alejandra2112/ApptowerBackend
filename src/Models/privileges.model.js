const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const rolsPermissions = require('./rolsPermissions.model');

const Privileges = sequelize.define('privileges', {
  idprivilege: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idprivilege',
  },
  privilege: {
    type: DataTypes.STRING,
    field: 'privilege',
  }
}, {
  timestamps: false,
});

//Relations
Privileges.hasMany(rolsPermissions, {
  foreignKey: 'idprivilege',
  sourceKey: 'idprivilege',
});

rolsPermissions.belongsTo(Privileges, {
  foreignKey: 'idprivilege',
  targetKey: 'idprivilege',
})

module.exports = Privileges;