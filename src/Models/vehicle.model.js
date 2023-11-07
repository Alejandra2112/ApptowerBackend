const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const SpaceResidentModel = require('./space.residents.model');

const Vehicle = sequelize.define('vehicle', {
    idvehicle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idvehicle',
    },

    idSpaceResident: {
        type: DataTypes.INTEGER,
        field: 'idSpace',
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
Vehicle.belongsTo(SpaceResidentModel,
    {
        foreignKey: 'idSpaceResident',
        targetKey: 'idSpaceResident',
    }
)
module.exports = Vehicle;