const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const ApartmentModel = require('./apartment.model');
const UsersModel = require('./users.model');

const Fines = sequelize.define('fines', {
    idFines: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idfines',
    },
    fineType: {
        type: DataTypes.STRING,
        field: 'fine_type',
    },
    incidentDate: {
        type: DataTypes.DATE,
        field: 'incident_date',
    },
    paymentDate: {
        type: DataTypes.DATE,
        field: 'payment_date',
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'amount',
    },
    details: {
        type: DataTypes.STRING(500),
        field: 'details',
    },
    idApartment: {
        type: DataTypes.INTEGER,
        field: 'idApartment',
    },
    state: {
        type: DataTypes.STRING,
        field: 'state',
    },
    evidenceFiles: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        field: 'evidence_files',
    },
    paymentproof: {
        type: DataTypes.TEXT,
        field: 'payment_proof',
    },
    idUser: {
        type: DataTypes.INTEGER,
        field: 'iduser',
    },
});

Fines.belongsTo(ApartmentModel, {
    foreignKey: 'idApartment',
    as: 'apartment'
});

Fines.belongsTo(UsersModel, {
    foreignKey: 'iduser',
    as: 'user'
});

module.exports = Fines;

