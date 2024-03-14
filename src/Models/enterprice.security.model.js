const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const EnterpriseSecurity = sequelize.define('enterprisesecurity', {
    idEnterpriseSecurity: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idEnterpriseSecurity',
    },
    nameEnterprice: {
        type: DataTypes.STRING,
        field: 'nameEnterprice',
        required: true,

    },
    NIT: {
        type: DataTypes.STRING,
        field: 'NIT',
        required: true,

    },
    address: {
        type: DataTypes.STRING,
        field: 'address',
        required: true,

    },
    phone: {
        type: DataTypes.STRING,
        field: 'phone',
        required: true,

    },
    email: {
        type: DataTypes.STRING,
        field: 'email',
        required: true,

    },
    state: {
        type: DataTypes.STRING,
        field: 'state',
        validate: {
            isIn: [['Activo', 'Inactivo']],
        },
        defaultValue: 'Activo',
    },
});

module.exports = EnterpriseSecurity;
