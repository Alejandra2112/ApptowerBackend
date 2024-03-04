const { Router } = require("express");
const route = Router();
const {
  getVisitorsAll,
  getVisitorsOne,
  postVisitors,
  putVisitors,
} = require("../Controllers/visitors.controller");
const { postVisitorsValidations, putVisitorsValidations } = require("../Middlewares/visitors.middleware");

// const checkPermissions = require("../Middlewares/checkPermission");
// const verifityToken = require("../Middlewares/verifityToken");
// const privilegesMap = require("../Helpers/Privileges.js");
// const permissionMap = require("../Helpers/Permission.js");

// route.use(verifityToken);

route.get(
  "/",
  //   checkPermissions(privilegesMap.get_visitors, permissionMap.visitantes),
  getVisitorsAll
),
  route.get(
    "/:idVisitor",
    // checkPermissions(privilegesMap.get_visitors, permissionMap.visitantes),
    getVisitorsOne
  ),
  route.post(
    "/",
    // visitorsValidations,
    postVisitorsValidations,
    // checkPermissions(privilegesMap.post_visitors, permissionMap.visitantes),
    postVisitors
  );

route.put(
  "/",
  putVisitorsValidations,
  // validations.putValidationVisitor,
  //   checkPermissions(privilegesMap.put_visitors, permissionMap.visitantes),
  putVisitors
);

module.exports = route;
