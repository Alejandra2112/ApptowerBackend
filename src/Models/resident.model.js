const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../Database/config');
const UserModel = require('./users.model');


const ResidentModel = sequelize.define('Residents', {

    idResident: {

        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idResident'

    },

    iduser: {

        type: DataTypes.INTEGER,
        field: "iduser"
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
        defaultValue: 'Inactive',
        field: 'status',
        validate: {
            isIn: [['Active', 'Inactive']]
        }
    }
}, {

    timestamps: true

});
  

UserModel.hasMany(ResidentModel, {
    foreignKey: 'iduser',
    sourceKey: 'iduser',
});

ResidentModel.belongsTo(UserModel, {
    foreignKey: 'iduser',
    targetKey: 'iduser',
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

