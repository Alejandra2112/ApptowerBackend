const { Sequelize, DataTypes } = require('sequelize');
const sequelizeUser = require('../Database/config');
const Residents = sequelizeUser.define('residents', {

    idResidents: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idResidents',
    },

    residentDocType: {
        type: DataTypes.STRING,
        field: 'residen tDocType',
        allowNull: false,
    },

    resdentDocNumber: {
        type: DataTypes.STRING,
        field: 'resdentDocNumber',
        unique: true,
        allowNull: false,
    },

    residentName: {
        type: DataTypes.STRING,
        field: 'residentName',
        allowNull: false,

    },
    resdeintLastName: {
        type: DataTypes.STRING,
        field: 'resdeintLastName',
        allowNull: false,
    },
    dateBirthDay: {
        type: DataTypes.DATE,
        field: 'dateBirthDay',
        allowNull: false,
    },

    residentEmail: {
        type: DataTypes.STRING,
        field: 'residentEmail',
        allowNull: false,
    },

    residentPhoneNumber: {
        type: DataTypes.STRING,
        field: 'residentPhoneNumber',
        allowNull: false,
    },

    residenType: {
        type: DataTypes.STRING,
        field: 'residenType',
        validate: {
            isIn: [['Lessee', 'Owner']],
        },
        defaultValue: 'Lessee',

    },

    currentResident: {
        type: DataTypes.BOOLEAN,
        field: 'currentResident',
        allowNull: false,

    },

    residencyStartDate: {
        type: DataTypes.DATE,
        field: 'residentStartDate',
        allowNull: false,

    },

    residencyEndDate: {
        type: DataTypes.DATE,
        field: 'residentEndDate',
        allowNull: true,

    },

    residentStatus: {
        type: DataTypes.STRING,
        field: 'residentStatus',
        validate: {
            isIn: [['Active', 'Inactive']],
        },
        defaultValue: 'Active',
    },
    
});

module.exports = Residents;


// Residents.belongsTo(Roles, { //muchos Residentss a un rol o si no es hasmany
//     foreignKey: 'idrol', // Debe coincidir con el campo en la tabla Residentss
//     targetKey: 'idrol', // Debe coincidir con el campo en la tabla Roles
// });

