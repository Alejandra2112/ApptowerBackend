const { Router } = require("express");
const route = Router();
const {
  getFinesAll,
  getFinesOne,
  postFines,
  putFines,
} = require("../Controllers/fines.controller");
const validations = require("../Middlewares/fines.middleware");
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
route.post(
  "/",
  validations.postFinesValidation,
  // checkPermissions(privilegesMap.post_fines, permissionMap.multas),
  postFines
);
route.put(
  "/",
  validations.putFinesValidation,
  // checkPermissions(privilegesMap.put_fines, permissionMap.multas),
  putFines
);

module.exports = route;
