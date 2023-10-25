const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const ResidentModel = sequelize.define('Residents', {

    idResident: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idResident'

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

    sex: {

        type: DataTypes.STRING(1),
        field: 'sex',
        validate: {
            isIn: [['M', 'F']]
        }
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

    phoneNumber: {

        type: DataTypes.STRING(15),
        field: 'phoneNumber',

    },

    residentType: {

        type: DataTypes.STRING(15),
        field: 'residentType',  
        validate: {
            isIn: [['tenant', 'owner']]
        }

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

module.exports = ResidentModel;
