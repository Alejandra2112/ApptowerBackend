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

    openingTime: {
        type: DataTypes.TIME,
        field: 'openingTime',
        allowNull: true,
    },

    closingTime: {
        type: DataTypes.TIME,
        field: 'closingTime',
        allowNull: true,
    },

    minTime: {
        type: DataTypes.INTEGER,
        field: 'minTime',
        allowNull: true,
    },

    maxTime: {
        type: DataTypes.INTEGER,
        field: 'maxTime',
        allowNull: true,
        validate: {
            min: 1,
            isInt: true,
        },
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