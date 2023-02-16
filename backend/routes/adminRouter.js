const Router = require('express')
const AdminController = require("../controllers/adminController");
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.get('/',)
router.post('/registration',checkRoleMiddleware('Администратор'), AdminController.registrationUsers)
router.post('/addPerfume', checkRoleMiddleware('Администратор'), AdminController.addPerfume)
router.post('/addRole', checkRoleMiddleware('Администратор'), AdminController.addRole)
router.post('/addTypeStock', checkRoleMiddleware('Администратор'), AdminController.addTypeStock)
router.post('/addTypeFlavoring', checkRoleMiddleware('Администратор'), AdminController.addTypeFlavoring)
router.post('/addFlavoring', checkRoleMiddleware('Администратор'), AdminController.addFlavoring)
router.post('/addConsume', checkRoleMiddleware('Администратор'), AdminController.addConsume)
router.post('/addFlavoringConsume', checkRoleMiddleware('Администратор'), AdminController.addFlavoringConsume)

module.exports = router