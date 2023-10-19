require('dotenv').config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USER,
  secretkey: process.env.MISECRETKEY,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = sequelize;


// const sequelize = new Sequelize(
//   'postgres://apptower:IsNATrGwAQUUrJxs7H6fn6gIIyfeyaqm@dpg-ckkkg86a18fc73ai6npg-a.oregon-postgres.render.com/apptowerdb',
//   {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true
//       }
//     }
//   }
// );

// const sequelize = new Sequelize(
//   'postgres://apptower:IsNATrGwAQUUrJxs7H6fn6gIIyfeyaqm@dpg-ckkkg86a18fc73ai6npg-a.oregon-postgres.render.com/apptowerdb',
//   {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true // Cambié 'true' a true y eliminé la coma adicional
//       }

//     }
//   }
// );

// module.exports = sequelize;



