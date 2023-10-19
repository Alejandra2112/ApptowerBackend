const { Sequelize, DataTypes } = require('sequelize');
const sequelizeUser = require('../Database/config'); 
const Roles = require('../Models/roles');
const Vigilante = require('../Models/vigilantes'); 

const Usuario = sequelizeUser.define('usuarios', {
  idusuario: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true,
    field: 'idusuario', 
  },
  tipodocumento: {
    type: DataTypes.STRING,
    field: 'tipodocumento', 
     
  },
  documento: {
    type: DataTypes.STRING,
    field: 'documento',
    unique: true, 
    allowNull: true, 
    
  },
  nombre: {
    type: DataTypes.STRING,
    field: 'nombre',
    
  },
  apellido: {
    type: DataTypes.STRING,
    field: 'apellido', 
    
  },
  idrol: {
    type: DataTypes.INTEGER,
    field: 'idrol',
      
  },
  correo: {
    type: DataTypes.STRING,
    field: 'correo', 
  },
  telefono: {
    type: DataTypes.STRING,
    field: 'telefono', 
  },
  fechacreacion: {
    type: DataTypes.DATE,
    field: 'fechacreacion', 
    defaultValue: Sequelize.literal('CURRENT_DATE'), 
  },
  contrasena: {
    type: DataTypes.STRING,
    field: 'contrasena', 
    validate: {
      len: [8, 12], 
    },
   
  },
  estado: {
    type: DataTypes.STRING,
    field: 'estado', 
    validate: {
      isIn: [['ACTIVO', 'INACTIVO']], 
    },
    defaultValue: 'ACTIVO', 
  },
}, {
  timestamps: false, 
});

module.exports = Usuario;


Usuario.belongsTo(Roles, { //muchos usuarios a un rol o si no es hasmany
    foreignKey: 'idrol', // Debe coincidir con el campo en la tabla Usuarios
    targetKey: 'idrol', // Debe coincidir con el campo en la tabla Roles
  });


Usuario.afterCreate(async (usuario) => {
  if (usuario.idrol === 3) {
    // Crea un registro en la tabla de Vigilantes asociado a este usuario
    await Vigilante.create({
      nombrevigilante: usuario.nombre,
      apellidovigilante: usuario.apellido,
      tipodocumento: usuario.tipodocumento,
      documento: usuario.documento,
      telefono: usuario.telefono,
      fechanacimiento: null,
      estado: 'ACTIVO',
    }, {
    
      timestamps: false, // Deshabilita los timestamps para esta operación de creación
    });
  }
});
