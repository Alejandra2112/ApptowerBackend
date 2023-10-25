const express = require('express');
const sequelize = require('../Database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.UserPath = '/api/users';
    this.RolsPath = '/api/rols';
    this.WatchmanPath = '/api/watchman';
    this.permissionsRolsPath = '/api/permissionsrols';
    this.guardShiftsPath = '/api/guardshifts';
    this.LoginPath = '/api/login';
    this.bookingPath = '/api/booking';
    this.vehiclePath = '/api/vehicle';
    this.middlewares();
    this.routes();
    this.db_connect();

  }

  middlewares() {
    this.app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization'
        );
        return next();
    });
    this.app.use(express.json());
}
  routes() {
    // this.app.use(this.UserPath, require('../Routes/user'));
    // this.app.use(this.RolsPath, require('../Routes/rols'));
    // this.app.use(this.WatchmanPath, require('../Routes/watchman'));
    // this.app.use(this.permissionsRolsPath, require('../Routes/permissionsRols'));
    // this.app.use(this.guardShiftsPath, require('../Routes/guardShifts'))
    // this.app.use(this.LoginPath, require('../Routes/login'));

    // routes for spaces process

    // this.app.use(this.spacesPath, require('../Routes/spaces'))
    // this.app.use(this.ParkingSpacesPath, require('../Routes/parkingSpaces'))

    // routes for residents process 

    // this.app.use(this.residentsPath, require('../Routes/residents'))
    // this.app.use(this.OwnersPath, require('../Routes/owners'))
  }

  async db_connect() {
    try {
      await sequelize.authenticate();
      // Sincroniza los modelos con la base de datos
      sequelize.sync({ force: false }).then(() => {
        console.log('Modelos sincronizados con la base de datos');
      });
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
