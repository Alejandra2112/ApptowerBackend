const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const ParkingSpaceModel = require('./parking.spaces.model')
const AssignedParkingModel = require('./assigned.parking.model')
const ApartmentOwnerModel = require('./apartment.owners.model')
const OwnersModel = require('./owners.model');
const ResidentModel = require('./resident.model');
const ApartmentResidentModel = require('./apartment.residents.model');
const TowerModel = require('./tower.model');

const ApartmentModel = sequelize.define('Apartments', {

    idApartment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idApartment',
    },

    idTower: {

        type: DataTypes.INTEGER,
        field: "idTower",

    },

    apartmentName: {

        type: DataTypes.STRING,
        field: 'apartmentName',

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

ApartmentModel.belongsTo(TowerModel, {
    foreignKey: 'idTower',
    targetKey: 'idTower',
});

TowerModel.hasMany(ApartmentModel, {
    foreignKey: 'idTower',
    sourceKey: 'idTower',
});


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

// Configuración de la asociación con Apartments
ApartmentResidentModel.belongsTo(ApartmentModel, {
    foreignKey: 'idApartment',
    targetKey: 'idApartment',
  });
  
  ApartmentModel.hasMany(ApartmentResidentModel, {
    foreignKey: 'idApartment',
    sourceKey: 'idApartment',
  });



module.exports = ApartmentModel;