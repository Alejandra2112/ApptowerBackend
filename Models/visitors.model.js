const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const Visitors = sequelize.define('visitors', {
    idVisitor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idvisitor',
    },
    name: {
        type: DataTypes.STRING,
        field: 'name',
    },
    lastname: {
        type: DataTypes.STRING,
        field: 'lastname',
    },
    documentType: {
        type: DataTypes.STRING,
        field: 'document_type',
    },
    documentNumber: {
        type: DataTypes.STRING,
        field: 'document_number',
    },
    genre: {
        type: DataTypes.STRING,
        field: 'genre',
    },
    access: {
        type: DataTypes.BOOLEAN,
        field: 'access',
    },
});

module.exports = Visitors;
