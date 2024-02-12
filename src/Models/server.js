const express = require('express');
const sequelize = require('../Database/config');
const fileUpload = require('express-fileupload')
const http = require('http');
const cookieParser = require('cookie-parser');


const { Server } = require('socket.io')
class Servers {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
      connectionStateRecovery: {
        timeout: 31557600000,
      },
    });

    //Users process path
    this.UserPath = '/api/users';
    this.LoginPath = '/api/login';
    this.EmailPath = '/api/email';
    this.informationUser = '/api/informationUser';

    //Rols process path
    this.RolsPath = '/api/rols';
    this.permissionsRolsPath = '/api/permissions';
    this.permissionsPrivilegesPath = '/api/privileges';
    this.getPermissionFromRole = '/api/permissionfromrole';
    this.getPrivilegeFromRole = '/api/privilegefromrole';

    //Watchman process path
    this.WatchmanPath = '/api/watchman';
    this.guardShiftsPath = '/api/guardshifts';
    this.EnterpriceSecurityPath = '/api/enterpricesecurity';


    this.VisitorsPath = '/api/visitors';
    this.GuestIncomePath = '/api/guestincome';
    this.FinesPath = '/api/fines';

    // Spaces process path
    this.ApartmentsPath = '/api/apartments';
    this.ApartmentsPath = '/api/apartments';
    this.SpacesPath = '/api/spaces';
    this.towerPath = '/api/towers';
    this.ParkingSpacesPath = '/api/parkingSpaces';
    this.AssignedParkingPath = '/api/assignedParkingSpaces';

    // Residents process path
    this.OwnersPath = '/api/owners';
    this.ResidentsPath = '/api/residents';
    this.ApartmentOwnersPath = '/api/apartmentOwners';
    this.ApartmentResidentsPath = '/api/aparmentResidents';
    // this.ApartmentOwnersPath = '/api/spacesOwners';
    // this.ApartmentResidentsPath = '/api/spaceResidents';

    this.bookingPath = '/api/booking';
    this.GuestIncomeParkingPath = '/api/guestincomeparking';
    this.vehiclePath = '/api/vehicle';
    this.notificationPath = '/api/notification';

    this.middlewares();
    this.routes();
    this.db_connect();
    this.socketConfig();
  }

  middlewares() {
    this.app.use(cookieParser()); 
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
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }
  routes() {
    this.app.use(this.LoginPath, require('../Routes/logIn.routes'))
    this.app.use(this.UserPath, require('../Routes/users.routes'));
    this.app.use(this.RolsPath, require('../Routes/rols.routes'));
    this.app.use(this.WatchmanPath, require('../Routes/watchmans.routes'));
    this.app.use(this.permissionsRolsPath, require('../Routes/permissions.routes'));
    this.app.use(this.permissionsPrivilegesPath, require('../Routes/privileges.routes'));
    this.app.use(this.guardShiftsPath, require('../Routes/guardShifts.routes'))
    this.app.use(this.EnterpriceSecurityPath, require('../Routes/enterprice.security.routes'));
    this.app.use(this.EmailPath, require('../Routes/email.routes'));
    this.app.use(this.getPermissionFromRole, require('../Routes/TokenPermission.routes'));
    this.app.use(this.informationUser, require('../Routes/TokenInformationUser.routes'));
    this.app.use(this.getPrivilegeFromRole, require('../Routes/TokenPrivilege.routes'));

    // routes for booking process

    this.app.use(this.bookingPath, require('../Routes/booking.routes'));
    this.app.use(this.GuestIncomeParkingPath, require('../Routes/guestincomeParking.routes'));
    this.app.use(this.vehiclePath, require('../Routes/vehicle.routes'));
    this.app.use(this.notificationPath, require('../Routes/notification.routes'));

    // routes for spaces process

    this.app.use(this.ApartmentsPath, require('../Routes/apartment.routes'))
    this.app.use(this.SpacesPath, require('../Routes/spaces.routes'))
    this.app.use(this.ParkingSpacesPath, require('../Routes/parking.spaces.routes'))
    this.app.use(this.AssignedParkingPath, require('../Routes/assigned.parking.routes'))
    this.app.use(this.towerPath, require('../Routes/tower.routes'))


    // routes for residents process 

    this.app.use(this.ResidentsPath, require('../Routes/residents.routes'))
    this.app.use(this.OwnersPath, require('../Routes/owners.routes'))
    this.app.use(this.ApartmentOwnersPath, require('../Routes/apartment.owner.routes'))
    this.app.use(this.ApartmentResidentsPath, require('../Routes/apartment.residents.routes'))
    // this.app.use(this.ApartmentOwnersPath, require('../Routes/apartment.owner.routes'))
    // this.app.use(this.ApartmentResidentsPath, require('../Routes/apartment.residents.routes'))


    this.app.use(this.VisitorsPath, require('../Routes/visitors.routes'))
    this.app.use(this.GuestIncomePath, require('../Routes/guest.income.routes'))
    this.app.use(this.FinesPath, require('../Routes/fines.routes'))
  }

  async db_connect() {

    try {

      await sequelize.sync({ force: false }).then(() => {
        console.log('Models synchronized with the database');

      });

      console.log('PostgreSQL connected');

    } catch (err) {

      console.error('Error connecting PostgreSQL:', err);

    }
  }

  // Socket

  socketConfig() {
    this.io.on('connection', socket => {

      console.log('Cliente conectado', socket)

      socket.on('disconnect', () => {
        console.log('Cliente desconectado')

      })
    })
  }

  // socketConfig() {
  //   this.io.on('connection', (socket) => {  
  //     console.log('Nuevo cliente conectado', socket);
  //     socket.on('message_new', async (msg) => {
  //       try {
  //         const message = await Notification.create({
  //           content: msg
  //         })
  //         this.io.emit('message', { id: message.id, content: message.content })
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     });

  //     socket.on('disconnect', () => {
  //       console.log('Cliente desconectado');
  //     });
  //   });

  // }

  listen() {


    this.server.listen(this.port, () => {
      console.log('listening on:' + this.port);
    });
  }
}

module.exports = Servers;
