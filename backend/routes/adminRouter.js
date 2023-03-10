const Router = require('express')
const AdminController = require("../controllers/adminController");
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.get('/',)
router.post('/registration', AdminController.registrationUsers)
router.post('/addPerfume',  AdminController.addPerfume)
router.post('/addRole', AdminController.addRole)
router.post('/addTypeStock', AdminController.addTypeStock)
router.post('/addTypeFlavoring', AdminController.addTypeFlavoring)
router.post('/addTypeConsumable', AdminController.addTypeConsumable)
router.post('/addFlavoring', AdminController.addFlavoring)
router.post('/addConsume',  AdminController.addConsume)
router.post('/addFlavoringConsume',  AdminController.addFlavoringConsume)

module.exports = router