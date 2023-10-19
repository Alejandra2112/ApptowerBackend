const express = require('express');
const sequelize = require('../Database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.UsuarioPath = '/api/usuarios';
    this.RolesPath = '/api/roles';
    this.VigilantePath = '/api/vigilantes';
    this.PermisoRolPath = '/api/permisorol';
    this.TurnosPath = '/api/turnosv';
    this.LoginPath = '/api/login';
    this.routes();
    this.db_connect();
    this.app.use(express.json()); 
  }

  routes() {
    this.app.use(this.UsuarioPath, require('../Routes/usuario'));
    this.app.use(this.RolesPath, require('../Routes/roles'));
    this.app.use(this.VigilantePath, require('../Routes/vigilantes'));
    this.app.use(this.PermisoRolPath, require('../Routes/permisosRol'));
    this.app.use(this.TurnosPath, require('../Routes/turnosVigilantes'))
    this.app.use(this.LoginPath, require('../Routes/login'));
  }

  async db_connect() {
    try {
      await sequelize.authenticate();
      console.log('Conexión exitosa a PostgreSQL');
    } catch (err) {
      console.error('Error al conectar a PostgreSQL:', err);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
