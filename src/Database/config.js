require('dotenv').config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.externalDbUrl, {
  timezone: 'America/Bogota',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;


// require('dotenv').config();
// const { Sequelize } = require('sequelize');


// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.HOST,
//   port: process.env.PORT,
//   username: process.env.USER,
//   secretkey: process.env.MISECRETKEY,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

// module.exports = sequelize;





