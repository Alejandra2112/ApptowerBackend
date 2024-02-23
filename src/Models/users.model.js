const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/config');
const Rols = require('./rols.model');
const Watchmans = require('./watchmans.model');

const UserModel = sequelize.define('users', {

  iduser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'iduser',
  },

  userImg: {

    type: DataTypes.STRING,
    field: 'userImg',
    allowNull: true

  },

  pdf: {
    type: DataTypes.STRING,
    field: 'pdf',
    allowNull: true
  },

  docType: {
    type: DataTypes.STRING,
    field: 'docType',
  },

  document: {
    type: DataTypes.STRING,
    field: 'document',
    unique: {
      msg: 'El documento ya se encuentra asignado a un usuario'
    },
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    field: 'name',
  },

  lastName: {
    type: DataTypes.STRING,
    field: 'lastName',

  },

  birthday: {

    type: DataTypes.DATE,
    field: 'birthday',
    allowNull: true
  },

  sex: {

    type: DataTypes.STRING,
    field: 'sex',
    validate: {
      isIn: [['M', 'F', 'O', 'No proporcionado']],
    },
    allowNull: true
  },

  idrole: {
    type: DataTypes.INTEGER,
    field: 'idrole'
  },


  email: {
    type: DataTypes.STRING,
    unique: {
      msg: 'El correo ya se encuentra asignado a un usuario'
    },
    field: 'email',
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    field: 'phone',
  },

  status: {
    type: DataTypes.STRING,
    field: 'status',
    validate: {
      isIn: [['Activo', 'Inactivo']],
    },
    defaultValue: 'Activo',
  },

  password: {
    type: DataTypes.STRING,
    field: 'password',
    allowNull: true,
    validate: {
      notEmpty: {
        args: true,
        msg: 'La contraseña no puede estar vacía',
      },
    },
  },


});

//Relations
UserModel.belongsTo(Rols, {
  foreignKey: 'idrole',
  targetKey: 'idrole',
});

UserModel.hasMany(Watchmans, {
  foreignKey: 'iduser',
  sourceKey: 'iduser',
});

Watchmans.belongsTo(UserModel, {
  foreignKey: 'iduser',
  targetKey: 'iduser',
});

// Comente esta relaicon por que ya no tenia sentido que existiera

// UserModel.belongsToMany(Watchmans, {
//   through: usersforWatchmans,
//   foreignKey: 'iduser',
//   otherKey: 'idwatchman',
// });

// User.belongsToMany(ResidentModel, {
//   through: usersforResidents,
//   foreignKey: 'iduser',
//   otherKey: 'idResident',
// });


module.exports = UserModel;


// //Hooks

// User.afterCreate(async (user) => {
//   if (user.namerole === 2 && user.state === 'Activo') {
//     const cretedResident = await ResidentModel.create({
//       name: user.name,
//       lastName: user.lastname,
//       docType: user.documentType,
//       docNumber: user.document,
//       phoneNumber: user.phone,
//       email: user.email,
//       birthday: null,
//       sex: null,
//       residentType: null,
//       status: 'Active',
//     });

//     const residentId = cretedResident.idResident

//     await usersforResidents.create({
//       iduser: user.iduser,
//       idResident: residentId,
//     });

//   }
//   else if (user.idrole === 3 && user.state === 'Activo') {
//     const createdwatchman = await Watchmans.create({
//       namewatchman: user.name,
//       lastnamewatchman: user.lastname,
//       documentType: user.documentType,
//       document: user.document,
//       phone: user.phone,
//       email: user.email,
//       dateOfbirth: null,
//       state: 'Activo',
//     });

//     const watchmanId = createdwatchman.idwatchman

//     await usersforWatchmans.create({
//       iduser: user.iduser,
//       idwatchman: watchmanId,
//     });
//   }
// })


// User.afterUpdate(async (user) => {
//   if (user.idrole === 3 && user.state === 'Activo') {

//     const createW = await Watchmans.create({
//       namewatchman: user.name,
//       lastnamewatchman: user.lastname,
//       documentType: user.documentType,
//       document: user.document,
//       phone: user.phone,
//       email: user.email,
//       dateOfbirth: null,
//       state: user.state,
//     });
//     const watchmanId = createW.idwatchman;

//     await usersforWatchmans.create({
//       iduser: user.iduser,
//       idwatchman: watchmanId,
//     });
//   } else if (user.idrole === 3) {
//     const changesW = await Watchmans.findOne({ where: { document: user.document } });

//     if (changesW) {
//       await changesW.update({
//         namewatchman: user.name,
//         lastnamewatchman: user.lastname,
//         documentType: user.documentType,
//         document: user.document,
//         phone: user.phone,
//         email: user.email,
//         state: user.state,
//       });
//     }
//   }
// });

// User.afterUpdate(async (user) => {
//   if (user.idrole !== 3) {
//     await Watchmans.destroy({ where: { document: user.document } });
//     await usersforWatchmans.destroy({ where: { iduser: user.iduser } });
//   } else if (user.idrole !== 2) {
//     await ResidentModel.destroy({ where: { docNumber: user.document } });
//     await usersforResidents.destroy({ where: { iduser: user.iduser } });
//   }
// });


// User.afterUpdate(async (user) => {
//   if (user.idrole === 2 && user.state === 'Activo') {
//     const changesUserR = await ResidentModel.findOne({ where: { docType: user.document } });
//     if (changesUserR) {
//       await changesUserR.update({
//         name: user.name,
//         lastName: user.lastname,
//         docType: user.documentType,
//         phoneNumber: user.phone,
//         email: user.email,
//         birthday: null,
//         sex: null,
//         residentType: null,
//         // status: user.state ? 'Active' : 'Inactive',
//       });
//     } else {
//       const createResident = await ResidentModel.create({
//         name: user.name,
//         lastName: user.lastname,
//         docType: user.documentType,
//         docNumber: user.document,
//         phoneNumber: user.phone,
//         email: user.email,
//         birthday: null,
//         sex: null,
//         residentType: null,
//         status: 'Active',
//       });
//       const ResidentId = createResident.idResident

//       await usersforResidents.create({
//         iduser: user.iduser,
//         idResident: ResidentId,
//       });
//     }
//   }
// });