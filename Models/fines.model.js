const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');


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
    incidentDate:{
        type: DataTypes.DATE,
        field: 'incident_date',
    },
    paymentDate: {
        type: DataTypes.DATE,
        field: 'payment_date',
    },
    amount: {
        type: DataTypes.INTEGER,
        field: 'amount',
    },
    details: {
        type: DataTypes.STRING,
        field: 'details',
    },
    idSpace: {
        type: DataTypes.INTEGER,
        field: 'id_space',
    },
    apartmentNumber: {
        type: DataTypes.INTEGER,
        field: 'apartment_number',
    },
    state: {
        type: DataTypes.STRING,
        field: 'state',
    },
    evidenceFiles: {
        type: DataTypes.TEXT,
        field: 'evidence_files',
    },
    paymentproof: {
        type: DataTypes.TEXT,
        field: 'payment_proof',
    },
});

// Fines.belongsTo(Spaces, { foreignKey: 'idSpace' });

module.exports = Fines;

