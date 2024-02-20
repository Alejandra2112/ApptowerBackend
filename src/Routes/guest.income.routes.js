const { Router } = require("express");
const route = Router();
const {
  getGuestIncomeAll,
  getGuestIncomeOne,
  getGuestIncomeByApartment,
  postGuestIncome,
  putGuestIncome,

} = require("../Controllers/guest.income.controller");
const {guestIncomeValidations} = require("../Middlewares/guestIncome.middleware");

// const checkPermissions = require("../Middlewares/checkPermission");
// const verifityToken = require("../Middlewares/verifityToken");
// const privilegesMap = require("../Helpers/Privileges.js");
// const permissionMap = require("../Helpers/Permission.js");

// route.use(verifityToken);

route.get(
  "/",
//   checkPermissions(privilegesMap.get_guest_income, permissionMap.ingresos),
  getGuestIncomeAll
);

route.get(
  "/:idGuest_income",
//   checkPermissions(privilegesMap.get_guest_income, permissionMap.ingresos),
    getGuestIncomeOne
    );
route.get(
  "/byApartment/:idApartment",
  getGuestIncomeByApartment
);

route.post(
  "/",
  // validations.postValidationGuestIncome,
  guestIncomeValidations,
//   checkPermissions(privilegesMap.get_guest_income, permissionMap.ingresos),
  postGuestIncome
),
  route.put(
    "/",
    // validations.putValidationGuestIncome,
    guestIncomeValidations,
    // checkPermissions(privilegesMap.put_guest_income, permissionMap.ingresos),
    putGuestIncome
  );

module.exports = route;
