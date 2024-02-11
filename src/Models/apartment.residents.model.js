const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const ApartmentModel = require('./apartment.model');

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


module.exports = ApartmentResidentModel;
