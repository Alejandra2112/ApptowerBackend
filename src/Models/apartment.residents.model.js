const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const ApartmentModel = require('./apartment.model');
const ResidentModel = require('./resident.model');

const ApartmentResidentModel = sequelize.define('ApartmentResidents', {

  idApartmentResident: {

    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idApartmentResident',

  },

  idApartment: {

    type: DataTypes.INTEGER,
    field: 'idApartment',

  },

  idResident: {

    type: DataTypes.INTEGER,
    field: 'idResident',

  },

  residentStartDate: {

    type: DataTypes.DATE,
    field: 'residentStartDate',

  },

  residentEndDate: {

    type: DataTypes.DATE,
    field: 'residentEndDate',

  },

  status: {
    type: DataTypes.STRING,
    field: 'status',
    validate: {
      isIn: [['Active', 'Inactive']],
    },
    defaultValue: 'Active',
  },

}, {

  timestamps: false,

});

ApartmentModel.belongsToMany(
  ResidentModel, {
  through: ApartmentResidentModel,
  foreignKey: 'idApartment',
  otherKey: 'idResident'
});


ApartmentModel.hasMany(ApartmentResidentModel, {
  foreignKey: 'idApartment',
  sourceKey: 'idApartment',
});

// Configuración de la asociación con Apartments
ApartmentResidentModel.belongsTo(ApartmentModel, {
  foreignKey: 'idApartment',
  targetKey: 'idApartment',
  as: 'apartment'
});

ApartmentResidentModel.belongsTo(ResidentModel, {
  foreignKey: 'idResident',
  targetKey: 'idResident',
  as: 'resident'
});

module.exports = ApartmentResidentModel;
