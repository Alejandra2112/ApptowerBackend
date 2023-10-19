const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');


const RolPermiso = sequelize.define('rol_permiso', { 
  idrol_permiso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idrol_permiso',
  },
  idrol: {
    type: DataTypes.INTEGER,
  },
  idpermiso: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
  tableName: 'rol_permiso', 
});


module.exports = RolPermiso;
