const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const ApartmentModel = require('./apartment.model');

const Vehicle = sequelize.define('vehicles', {
    idvehicle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idvehicle',
    },

    idApartment: {
        type: DataTypes.INTEGER,
        field: 'idApartment',
        required: true,
    },

    state: {
        type: DataTypes.STRING,
        field: 'state',
        defaultValue: 'Activo',
        required: true,

    },
    description: {
        type: DataTypes.STRING,
        field: 'description',
        required: true,
    },

    licenseplate: {
        type: DataTypes.STRING,
        field: 'licenseplate',
        required: true,
    },

},
    {
        timestamps: false,
    },
);


Vehicle.belongsTo(ApartmentModel, {
    foreignKey: 'idApartment',
    targetKey: 'idApartment',

});
module.exports = Vehicle;