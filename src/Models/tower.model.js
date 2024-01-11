const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const TowerModel = sequelize.define('Towers', {

    idTower: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idTower'

    },

    towerName: {

        type: DataTypes.STRING(20),
        field: 'towerName'

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



module.exports = TowerModel;

