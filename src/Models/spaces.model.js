const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

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
            isIn: [['Social area', 'Wet area']],
        },
        // allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
        field: 'image',
        allowNull: true
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

    schedule: {
        type: DataTypes.JSON,
        field: 'schedule',
        allowNull: true,
    },

    maxTime: {
        type: DataTypes.TIME,
        field: 'maxTime',
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

module.exports = SpacesModel;