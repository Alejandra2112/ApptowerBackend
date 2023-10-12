const {Router} = require ('express')
const route = Router()
const {getRoles, postRoles, putRoles, deleteRoles} = require ('../Controllers/roles')

router.get('/', permissionController.getAllPermissions);
router.post('/', permissionController.createPermission);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

module.exports = router;
