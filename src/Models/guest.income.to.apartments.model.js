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



GuestIncomeToApartments.belongsTo(Guest_income, {
  foreignKey: "idGuest_income",
  as: "asociatedGuestIncome",
});

GuestIncomeToApartments.belongsTo(ApartmentModel, {
  foreignKey: "idApartment",
  as: "asociatedApartment",
});

module.exports = GuestIncomeToApartments;


