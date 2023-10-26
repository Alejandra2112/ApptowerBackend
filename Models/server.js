const express = require('express');
const sequelize = require('../Database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.UserPath = '/api/users';
    this.RolsPath = '/api/rols';
    this.WatchmanPath = '/api/watchman';
    this.permissionsRolsPath = '/api/permissions';
    this.guardShiftsPath = '/api/guardshifts';
    this.LoginPath = '/api/login';

    // Spaces process path

    this.SpacesPath = '/api/spaces';
    this.ParkingSpacesPath = '/api/parkingSpaces';
    this.AssignedParkingPath = '/api/assignedParkingSpaces';

    // Residents process path

    this.OwnersPath = '/api/owners';
    this.ResidentsPath = '/api/residents';
    this.SpaceOwnersPath = '/api/spacesOwners';
    this.SpaceResidentsPath = '/api/spaceResidents';



    this.bookingPath = '/api/booking';
    this.vehiclePath = '/api/vehicle';
    this.notificationPath = '/api/notification';
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
    this.app.use(this.UserPath, require('../Routes/users.route'));
    this.app.use(this.RolsPath, require('../Routes/rols.route'));
    this.app.use(this.LoginPath, require('../Routes/logIn.route'))
    this.app.use(this.WatchmanPath, require('../Routes/watchmans.route'));
    this.app.use(this.permissionsRolsPath, require('../Routes/permissions.route'));
    this.app.use(this.guardShiftsPath, require('../Routes/guardShifts.route'))
   
    this.app.use(this.bookingPath, require('../Routes/booking.routes'));
    this.app.use(this.vehiclePath, require('../Routes/vehicle.routes'));
    this.app.use(this.notificationPath, require('../Routes/notification.routes'));
    // routes for spaces process

    this.app.use(this.SpacesPath, require('../Routes/spaces.routes'))
    this.app.use(this.ParkingSpacesPath, require('../Routes/parking.spaces.routes'))
    this.app.use(this.AssignedParkingPath, require('../Routes/assigned.parking.routes'))


    // routes for residents process 

    this.app.use(this.ResidentsPath, require('../Routes/residents.routes'))
    this.app.use(this.OwnersPath, require('../Routes/owners.routes'))
    this.app.use(this.SpaceOwnersPath, require('../Routes/space.owner.routes'))
    this.app.use(this.SpaceResidentsPath, require('../Routes/space.residents.routes'))


  }

  async db_connect() {

    try {
      // await sequelize.authenticate();
      // Sincroniza los modelos con la base de datos
      await sequelize.sync({ force: true }).then(() => {
        console.log('Modelos sincronizados con la base de datos');

      });

      console.log('PostgreSQL connection ok');

    } catch (err) {

      console.error('Error to connect PostgreSQL:', err);

    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening port ${this.port}`);
    });
  }
}

module.exports = Server;
