const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const RolPermiso = sequelize.define('Rol_Permiso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idRol: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Roles',
      key: 'idRol',
    },
  },
  idPermiso: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Permisos',
      key: 'idPermiso',
    },
  },
});

module.exports = RolPermiso;
