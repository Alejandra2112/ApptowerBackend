const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const ParkingSpaceModel = require('./parking.spaces.model')
const AssignedParkingModel = require('./assigned.parking.model')
const ApartmentOwnerModel = require('./apartment.owners.model')
const OwnersModel = require('./owners.model');
const ResidentModel = require('./resident.model');
const ApartmentResidentModel = require('./apartment.residents.model');

const ApartmentModel = sequelize.define('Apartments', {

    idApartment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idApartment',
    },

    tower: {

        type: DataTypes.STRING,
        field: "tower",

    },

    apartmentName: {
        type: DataTypes.STRING,
        field: 'apartmentName',
        // allowNull: false,
    },

    area: {
        type: DataTypes.DOUBLE,
        field: 'area',
        allowNull: true,

    },

    status: {
        type: DataTypes.STRING,
        field: 'status',
        validate: {
            isIn: [['Active', 'Inactive']],
        },
        defaultValue: 'Active',
    },

},

    {
        timestamps: false,
    }
);

ApartmentModel.belongsToMany(
    ParkingSpaceModel, {
    through: AssignedParkingModel,
    foreignKey: 'idApartment',
    otherKey: 'idParkingSpace'
});

ApartmentModel.belongsToMany(
    OwnersModel, {
    through: ApartmentOwnerModel,
    foreignKey: 'idApartment',
    otherKey: 'idOwner'
});

ApartmentModel.belongsToMany(
    ResidentModel, {
    through: ApartmentResidentModel,
    foreignKey: 'idApartment',
    otherKey: 'idResident'
});



module.exports = ApartmentModel;