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
    unique: {
      msg: 'El documento ya se encuentra asignado a un usuario'
    },
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

  },
  state: {
    type: DataTypes.STRING,
    field: 'state',
    validate: {
      isIn: [['Activo', 'Inactivo']],
    },
    defaultValue: 'Activo',
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

    const createW = await Watchmans.create({
      namewatchman: user.name,
      lastnamewatchman: user.lastname,
      documentType: user.documentType,
      document: user.document,
      phone: user.phone,
      email: user.email,
      dateOfbirth: null,
      state: user.state,
    });
    const watchmanId = createW.idwatchman;

    await usersforWatchmans.create({
      iduser: user.iduser,
      idwatchman: watchmanId,
    });
  } else if (user.idrole === 3) {
    const changesW = await Watchmans.findOne({ where: { document: user.document } });

    if (changesW) {
      await changesW.update({
        namewatchman: user.name,
        lastnamewatchman: user.lastname,
        documentType: user.documentType,
        document: user.document,
        phone: user.phone,
        email: user.email,
        state: user.state,
      });
    }
  }
});

User.afterUpdate(async (user) => {
  if (user.idrole !== 3) {
    await Watchmans.destroy({ where: { document: user.document } });
    await usersforWatchmans.destroy({ where: { iduser: user.iduser } });
  } else if (user.idrole !== 2) {
    await ResidentModel.destroy({ where: { docNumber: user.document } });
    await usersforResidents.destroy({ where: { iduser: user.iduser } });
  }
});


User.afterUpdate(async (user) => {
  if (user.idrole === 2 && user.state === 'Activo') {
    const changesUserR = await ResidentModel.findOne({ where: { docType: user.document } });
    if (changesUserR) {
      await changesUserR.update({
        name: user.name,
        lastName: user.lastname,
        docType: user.documentType,
        phoneNumber: user.phone,
        email: user.email,
        birthday: null,
        sex: null,
        residentType: null,
        // status: user.state ? 'Active' : 'Inactive',
      });
    } else {
      const createResident = await ResidentModel.create({
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
      const ResidentId = createResident.idResident

      await usersforResidents.create({
        iduser: user.iduser,
        idResident: ResidentId,
      });
    }
  }
});

module.exports = User;

