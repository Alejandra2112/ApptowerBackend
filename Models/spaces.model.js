const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const ParkingSpaceModel = require('../Models/parking.spaces.model')
const AssignedParkingModel = require('../Models/assigned.parking.model')

const SpacesModel = sequelize.define('Spaces', {

    idSpace: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idSpace',
    },

    spaceType: {
        type: DataTypes.STRING,
        field: 'spaceType',
        validate: {
            isIn: [['Apartament', 'Social area', 'Wet area']],
        },
        // allowNull: false,
    },

    spaceName: {
        type: DataTypes.STRING,
        field: 'spaceName',
        unique: true
        // allowNull: false,
    },

    area: {
        type: DataTypes.DOUBLE,
        field: 'area',
        allowNull: true,

    },

    capacity: {
        type: DataTypes.INTEGER,
        field: 'capacity',
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

SpacesModel.belongsToMany(ParkingSpaceModel, { through: AssignedParkingModel, foreignKey: 'idSpace', otherKey: 'idParkingSpace' });


module.exports = SpacesModel;