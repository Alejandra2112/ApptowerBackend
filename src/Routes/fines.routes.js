const { Router } = require("express");
const route = Router();
const {
  getFinesAll,
  getFinesOne,
  getFinesByApartment,
  postFines,
  putFines,

} = require("../Controllers/fines.controller");
const {postFinesValidations, putFinesValidations} = require("../Middlewares/fines.middleware");
const validation = require("../Middlewares/validation.middleware");
// const checkPermissions = require("../Middlewares/checkPermission");
// const verifityToken = require("../Middlewares/verifityToken");
// const privilegesMap = require("../Helpers/Privileges.js");
// const permissionMap = require("../Helpers/Permission.js");

// route.use(verifityToken);

route.get(
  "/",
  // checkPermissions(privilegesMap.get_fines, permissionMap.multas),
  getFinesAll
);
route.get(
  "/:idfines",
  // checkPermissions(privilegesMap.get_fines, permissionMap.multas),
  getFinesOne);
route.get(

  "/byApartment/:idApartment",
  // checkPermissions(privilegesMap.get_fines, permissionMap.multas),
  getFinesByApartment
);
route.post(
  "/",
  // validations.postFinesValidation,
  // finesValidations,
  postFinesValidations,
  validation,
  // checkPermissions(privilegesMap.post_fines, permissionMap.multas),
  postFines
);
route.put(
  "/",
  putFinesValidations,
  validation,
  // finesValidations,
  // checkPermissions(privilegesMap.put_fines, permissionMap.multas),
  putFines
);

module.exports = route;
