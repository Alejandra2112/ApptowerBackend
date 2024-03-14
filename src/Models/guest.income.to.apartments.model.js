const { DataTypes } = require("sequelize");
const sequelize = require("../Database/config");
const Guest_income = require("./guest.income.model");
const ApartmentModel = require("./apartment.model");

const GuestIncomeToApartments = sequelize.define(
  "guestIncomeToApartment",
  {
    idGuestIncomeToApartment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "idGuestIncomeToApartment",
    },
    idApartment: {
      type: DataTypes.INTEGER,
      field: "idApartment",
    },
    idGuest_income: {
      type: DataTypes.INTEGER,
      field: "idGuest_income",
    },
  },
  {
    timestamps: false,
  }
);

// GuestIncomeToApartments.belongsTo(Guest_income, {
//   foreignKey: "idGuest_income",
//   targetKey: "idGuest_income",
// });

// GuestIncomeToApartments.belongsTo(ApartmentModel, {
//   foreignKey: "idApartment",
//   targetKey: "idApartment",
// });
// ApartmentModel.belongsToMany(Guest_income, { through: GuestIncomeToApartments });
// Guest_income.belongsToMany(ApartmentModel, { through: GuestIncomeToApartments });

module.exports = GuestIncomeToApartments;

//   GuestIncomeToApartments.belongsTo(Visitors, {
//     foreignKey: 'idVisitor', as: 'asociatedVisitor'
//   });
