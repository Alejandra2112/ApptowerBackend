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
    },

    state: {
        type: DataTypes.STRING,
        field: 'state',
        defaultValue: 'Activo',

    },
    description: {
        type: DataTypes.STRING,
        field: 'description',
    },

    licenseplate: {
        type: DataTypes.STRING,
        field: 'licenseplate',
    },

},
{
    timestamps: false,
},
);
Vehicle.belongsToMany(ApartmentModel,
    {
        foreignKey: 'idApartment',
        targetKey: 'idApartment',
    }
)
module.exports = Vehicle;