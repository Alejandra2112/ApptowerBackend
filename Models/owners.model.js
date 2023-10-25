const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const OwnersModel = sequelize.define('Owners', {

    idOwner: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idOwner'

    },

    docType: {

        type: DataTypes.STRING(5),
        field: 'docType',
        validate: {
            isIn: [['CC', 'CE']]
        }
        // allowNull: false

    },

    docNumber: {

        type: DataTypes.STRING(15),
        field: 'docNumber',
        // allowNull: false

    },

    name: {

        type: DataTypes.STRING(255),
        field: 'name',
        // allowNull: false

    },

    lastName: {

        type: DataTypes.STRING(255),
        field: 'lastName',
        // allowNull: false

    },

    birthday: {

        type: DataTypes.DATE,
        field: 'birthday',
        // allowNull: false

    },

    email: {

        type: DataTypes.STRING(80),
        field: 'email',
        // allowNull: false

    },

    phoneNumer: {

        type: DataTypes.STRING(15),
        field: 'phoneNumer',

    },

    status: {

        type: DataTypes.STRING(20),
        defaultValue: 'Active',
        field: 'status',
        validate: {
            isIn: [['Active', 'Inactive']]
        }
    }
}, {

    timestamps: false
    
});

module.exports = OwnersModel;
