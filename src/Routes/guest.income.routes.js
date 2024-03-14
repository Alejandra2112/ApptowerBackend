const { Router } = require("express");
const route = Router();
const {
  getGuestIncomeAll,
  getGuestIncomeOne,
  getGuestIncomeByApartment,
  postGuestIncome,
  putGuestIncome,

} = require("../Controllers/guest.income.controller");
const { postGuestIncomeValidations, putGuestIncomeValidations } = require("../Middlewares/guestIncome.middleware");
const validator = require("../Middlewares/validation.middleware");

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
  // postGuestIncomeValidations,
  // validator,
  //   checkPermissions(privilegesMap.get_guest_income, permissionMap.ingresos),
  postGuestIncome
),
  route.put(
    "/",
    // validations.putValidationGuestIncome,
    putGuestIncomeValidations,
    validator,
    // checkPermissions(privilegesMap.put_guest_income, permissionMap.ingresos),
    putGuestIncome
  );

module.exports = route;
