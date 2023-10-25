const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const Visitors = sequelize.define('visitantes', {
    idVisitor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idvisitante',
    },
    name: {
        type: DataTypes.STRING,
        field: 'nombre',
    },
    lastname: {
        type: DataTypes.STRING,
        field: 'apellidos',
    },
    documentType: {
        type: DataTypes.STRING,
        field: 'tipo_documento',
    },
    documentNumber: {
        type: DataTypes.STRING,
        field: 'numero_documento',
    },
    genre: {
        type: DataTypes.STRING,
        field: 'sexo',
    },
    createDate: {
        type: DataTypes.DATE,
        field: 'fecha_creacion',
    },
    access: {
        type: DataTypes.BOOLEAN,
        field: 'acceso',
    },
});

module.exports = Visitors;
