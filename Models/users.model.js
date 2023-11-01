const { Sequelize, DataTypes } = require('sequelize');
const sequelizeUser = require('../Database/config');
const Rols = require('./rols.model');
const Watchmans = require('./watchmans.model');
const usersforWatchmans = require('./user.watchman.model');
const usersforResidents = require('./user.residents');
const ResidentModel = require('./resident.model')

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
    field: 'idrole'
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
    // validate: {
    //   len: [8, 12], 
    // },

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

//Relations
User.belongsTo(Rols, {
  foreignKey: 'idrole',
  targetKey: 'idrole',
});

User.belongsToMany(Watchmans, {
  through: usersforWatchmans,
  foreignKey: 'iduser',
  otherKey: 'idwatchman',
});

User.belongsToMany(ResidentModel, {
  through: usersforResidents,
  foreignKey: 'iduser',
  otherKey: 'idResident',
});

//Hooks

User.afterCreate(async (user) => {
  if (user.idrole === 2 && user.state === 'Activo') {
    const cretedResident = await ResidentModel.create({
      name: user.name,
      lastName: user.lastname,
      docType: user.documentType,
      docNumber: user.document,
      phoneNumber: user.phone,
      email: user.email,
      birthday: null,
      sex: null,
      residentType: null,
      status: 'Active',
    });

    const residentId = cretedResident.idResident

    await usersforResidents.create({
      iduser: user.iduser,
      idResident: residentId,
    });

  }
  else if (user.idrole === 3 && user.state === 'Activo') {
    const createdwatchman = await Watchmans.create({
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
})



User.afterUpdate(async (user) => {
  if (user.idrole === 3 && user.state === 'Activo') {
    const existingWatchman = await Watchmans.findOne({ where: { document: user.document } });
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
      const changesUserW = await Watchmans.create({
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
  }
  else {
    await Watchmans.destroy({ where: { document: user.document } });
    await usersforWatchmans.destroy({ where: { iduser: user.iduser } });
  }
});



User.afterUpdate(async (user) => {
  if (user.idrole === 2 && user.state === 'Activo') {
    const existingResidents = await ResidentModel.findOne({ where: { docType: user.document } });
    if (existingResidents) {
      await existingResidents.update({
        name: user.name,
        lastName: user.lastname,
        docType: user.documentType,
        docNumber: user.document,
        phoneNumber: user.phone,
        email: user.email,
        birthday: null,
        sex: null,
        residentType: null,
        status: user.state ? 'Active' : 'Inactive',
      });
    } else {
      const changesUserR = await ResidentModel.create({
        name: user.name,
        lastName: user.lastname,
        docType: user.documentType,
        docNumber: user.document,
        phoneNumber: user.phone,
        email: user.email,
        birthday: null,
        sex: null,
        residentType: null,
        status: 'Active',
      });
      const ResidentId = changesUserR.idResident

      await usersforResidents.create({
        iduser: user.iduser,
        idResident: ResidentId,
      });
    }
  }
  else {
    await Resident.destroy({ where: { docNumber: user.document } });
    await usersforResidents.destroy({ where: { iduser: user.iduser } });
  }
});

module.exports = User;

