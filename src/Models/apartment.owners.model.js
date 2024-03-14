const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const ApartmentOwnerModel = sequelize.define('ApartmentOwners', {

  idApartmentOwner: {

    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idSpaceOwner',

  },

  idApartment: {

    type: DataTypes.INTEGER,
    field: 'idApartment',

  },

  idOwner: {

    type: DataTypes.INTEGER,
    field: 'idOwner',

  },

  OwnershipStartDate: {

    type: DataTypes.DATE,
    field: 'OwnershipStartDate',

  },

  OwnershipEndDate: {

    type: DataTypes.DATE,
    field: 'OwnershipEndDate',

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


module.exports = ApartmentOwnerModel;
