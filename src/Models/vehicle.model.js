const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const ApartmentResidentModel = require('./apartment.residents.model');

const Vehicle = sequelize.define('vehicle', {
    idvehicle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idvehicle',
    },

    idApartmentResident: {
        type: DataTypes.INTEGER,
        field: 'idApartmentResident',
    },

    typeuser: {
        type: DataTypes.STRING,
        field: 'typeuser',
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
Vehicle.belongsTo(ApartmentResidentModel,
    {
        foreignKey: 'idApartmentResident',
        targetKey: 'idApartmentResident',
    }
)
module.exports = Vehicle;