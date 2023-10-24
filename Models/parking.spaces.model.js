const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const ParkingSpacesModel = sequelize.define('ParkingSpaces', {

    idParkingSpace: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idParkingSpace',
    },

    parkingName: {
        type: DataTypes.STRING,
        field: 'parkingName',
        unique: true,
        // allowNull: false,
    },

    parkingType: {
        type: DataTypes.STRING,
        field: 'parkingType',
        validate: {
            isIn: [['Private', 'Public']],
        },
        // allowNull: false,
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

module.exports = ParkingSpacesModel;
