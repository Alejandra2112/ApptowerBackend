const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const OwnersModel = require('./owners.model');

const ResidentModel = sequelize.define('Residents', {

    idResident: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idResident'

    },

    pdf: {
        type: DataTypes.STRING, 
        field: 'pdf',
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

// Hooks for create and update owners

// ResidentModel.afterCreate(async (resident) => {

//     if (resident.residentType === 'owner') {

//         const owner = await OwnersModel.create({

//             docType: resident.docType,
//             docNumber: resident.docNumber,
//             name: resident.name,
//             lastName: resident.lastname,
//             birthday: resident.birthday,
//             email: resident.email,
//             phoneNumber: resident.phoneNumber,
//             status: 'Active',

//         });
//     }
// })




// ResidentModel.afterUpdate(async (resident) => {

//     console.log(resident + 'hola')

//     const ownerToUpdate = await OwnersModel.findOne({ where: { docNumber: resident.docNumber } });

//     if (ownerToUpdate) {


//         await ownerToUpdate.update({

//             docType: resident.docType,
//             docNumber: resident.docNumber,
//             name: resident.name,
//             lastName: resident.lastname,
//             birthday: resident.birthday,
//             email: resident.email,
//             phoneNumber: resident.phoneNumber,
//             status: ownerToUpdate.status
//         });


//     }

// }
// )

module.exports = ResidentModel;

