const { Sequelize, DataTypes } = require('sequelize');
const sequelizeUser = require('../Database/config'); 
const Rols = require('./rols.model');
const Watchman = require('./watchmans.model'); 
// const Residents = require('./residents');
const usersforWatchmans = require('./user.watchman.model');

const User = sequelizeUser.define('users', {
  iduser: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true,
    field: 'iduser', 
  },
  documentType: {
    type: DataTypes.STRING,
    field: 'documentType', 
  },
  document: {
    type: DataTypes.STRING,
    field: 'document',
    unique: true, 
    allowNull: true, 
  },
  name: {
    type: DataTypes.STRING,
    field: 'name',
  },
  lastname: {
    type: DataTypes.STRING,
    field: 'lastname', 
    
  },
  idrole: {
    type: DataTypes.INTEGER,
    field: 'idrole',
    validate: {
      isIn: [[1, 2, 3]], 
    },
    defaultValue: 2, 
  },
  email: {
    type: DataTypes.STRING,
    field: 'email', 
  },
  phone: {
    type: DataTypes.STRING,
    field: 'phone', 
  },
  password: {
    type: DataTypes.STRING,
    field: 'password', 
    validate: {
      len: [8, 12], 
    },
   
  },
  state: {
    type: DataTypes.STRING,
    field: 'state', 
    validate: {
      isIn: [['Activo', 'Inactivo']], 
    },
    defaultValue: 'Inactivo', 
  },
});

module.exports = User;


User.belongsTo(Rols, { 
    foreignKey: 'idrole', 
    targetKey: 'idrole', 
  });

  User.belongsToMany(Watchman, {
    through: usersforWatchmans, 
    foreignKey: 'iduser',
    otherKey: 'idwatchman',
  });
     


// User.afterCreate(async(user) => {
//   if(user.idrol === 2 && user.state === 'Activo'){
//     await Residents.create({
//       residentName: user.name,
//       resdeintLastName: user.lastname,
//       residentDocType: user.documentType,
//       resdentDocNumber: user.document,
//       residentPhoneNumber: user.phone,
//       residentEmail: user.email,
//       dateBirthDay: null,
//       residenType: null, 
//       currentResident: null,
//       residencyStartDate: null,
//       residencyEndDate: null,
//       residentStatus: 'Activo',
//     });
//   }
  
//   else if(user.idrol === 3 && user.state === 'Activo'){
//     await Watchman.create({
//       namewatchman: user.name,
//       lastnamewatchman: user.lastname,
//       documentType: user.documentType,
//       document: user.document,
//       phone: user.phone,
//       email: user.email,
//       dateOfbirth: null,
//       state: 'Activo',
//     });
//   }
// })




User.afterCreate(async (user) => {
  if (user.idrole === 3 && user.state === 'Activo') {
    const createdwatchman = await Watchman.create({
      namewatchman: user.name,
      lastnamewatchman: user.lastname,
      documentType: user.documentType,
      document: user.document,
      phone: user.phone,
      email: user.email,
      dateOfbirth: null,
      state: 'Activo',
    });
    
    const watchmanId = createdwatchman.idwatchman

    await usersforWatchmans.create({
      iduser: user.iduser,
      idwatchman: watchmanId,
    });
  }
});

User.afterUpdate(async (user) => {
  console.log('Aqui estoy creando  jejeje');
  if (user.idrole === 3 && user.state === 'Activo') {

    const existingWatchman = await Watchman.findOne({ where: { document: user.document } });
    if (existingWatchman) {
      await existingWatchman.update({
        namewatchman: user.name,
        lastnamewatchman: user.lastname,
        documentType: user.documentType,
        document: user.document,
        phone: user.phone,
        email: user.email,
        state: user.state,
      });
    } else {
      const changesUserW = await Watchman.create({
        namewatchman: user.name,
        lastnamewatchman: user.lastname,
        documentType: user.documentType,
        document: user.document,
        phone: user.phone,
        email: user.email,
        dateOfbirth: null,
        state: 'Activo',
      });
      const watchmanId = changesUserW.idwatchman

      await usersforWatchmans.create({
        iduser: user.iduser,
        idwatchman: watchmanId,
      });
    }
  } else {
    await Watchman.destroy({ where: { document: user.document } });
    await usersforWatchmans.destroy({ where: { iduser: user.iduser } });
  }
});

