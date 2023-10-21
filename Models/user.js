const { Sequelize, DataTypes } = require('sequelize');
const sequelizeUser = require('../Database/config'); 
const Rols = require('./rols');
const Watchman = require('./watchman'); 

const User = sequelizeUser.define('usuarios', {
  iduser: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true,
    field: 'idusuario', 
  },
  documentType: {
    type: DataTypes.STRING,
    field: 'tipodocumento', 
     
  },
  document: {
    type: DataTypes.STRING,
    field: 'documento',
    unique: true, 
    allowNull: true, 
    
  },
  name: {
    type: DataTypes.STRING,
    field: 'nombre',
    
  },
  lastname: {
    type: DataTypes.STRING,
    field: 'apellido', 
    
  },
  idrol: {
    type: DataTypes.INTEGER,
    field: 'idrol',
      
  },
  email: {
    type: DataTypes.STRING,
    field: 'correo', 
  },
  phone: {
    type: DataTypes.STRING,
    field: 'telefono', 
  },
  password: {
    type: DataTypes.STRING,
    field: 'contrasena', 
    validate: {
      len: [8, 12], 
    },
   
  },
  state: {
    type: DataTypes.STRING,
    field: 'estado', 
    validate: {
      isIn: [['Activo', 'Inactivo']], 
    },
    defaultValue: 'Activo', 
  },
});

module.exports = User;


User.belongsTo(Rols, { //muchos usuarios a un rol o si no es hasmany
    foreignKey: 'idrol', // Debe coincidir con el campo en la tabla Usuarios
    targetKey: 'idrol', // Debe coincidir con el campo en la tabla Roles
  });


User.afterCreate(async (user) => {
  if (user.idrol === 3) {
    // Crea un registro en la tabla de Vigilantes asociado a este usuario
    await Watchman.create({
      nombrevigilante: user.name,
      apellidovigilante: user.lastname,
      tipodocumento: user.documentType,
      documento: user.document,
      telefono: user.phone,
      correo: user.email,
      fechanacimiento: null,
      state: 'Activo',
    });
  }
});
