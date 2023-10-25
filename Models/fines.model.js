const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');


const Fines = sequelize.define('multas', {
    idFines: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idmulta',
    },
    taxeType: {
        type: DataTypes.STRING,
        field: 'tipo_multa',
    },
    incidentDate:{
        type: DataTypes.DATE,
        field: 'fecha_incidente',
    },
    createDate: {
        type: DataTypes.DATE,
        field: 'fecha_creacion',
    },
    paymentDate: {
        type: DataTypes.DATE,
        field: 'fecha_pago',
    },
    amount: {
        type: DataTypes.INTEGER,
        field: 'monto',
    },
    details: {
        type: DataTypes.STRING,
        field: 'detalles',
    },
    idSpace: {
        type: DataTypes.INTEGER,
        field: 'idespacio',
    },
    apartmentNumber: {
        type: DataTypes.INTEGER,
        field: 'numero_apartamento',
    },
    state: {
        type: DataTypes.STRING,
        field: 'estado',
    },
    evidenceFiles: {
        type: DataTypes.TEXT,
        field: 'archivos_evidencia',
    },
    paymentproof: {
        type: DataTypes.TEXT,
        field: 'comprobante_pago',
    },
});

// Fines.belongsTo(Spaces, { foreignKey: 'idSpace' });

module.exports = Fines;

