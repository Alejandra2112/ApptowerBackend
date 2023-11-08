const { Router } = require("express");
const route = Router();
const {
  getGuestIncomeAll,
  getGuestIncomeOne,
  postGuestIncome,
  putGuestIncome,
} = require("../Controllers/guest.income.controller");
const validations = require("../Middlewares/guestIncome.middleware");

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

route.post(
  "/",
  validations.postValidationGuestIncome,
//   checkPermissions(privilegesMap.get_guest_income, permissionMap.ingresos),
  postGuestIncome
),
  route.put(
    "/",
    validations.putValidationGuestIncome,
    // checkPermissions(privilegesMap.put_guest_income, permissionMap.ingresos),
    putGuestIncome
  );

module.exports = route;
