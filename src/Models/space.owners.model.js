const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const SpaceOwnerModel = sequelize.define('SpaceOwners', {

  idSpaceOwner: {

    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idSpaceOwner',

  },

  idSpace: {

    type: DataTypes.INTEGER,
    field: 'idSpace',

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


module.exports = SpaceOwnerModel;
