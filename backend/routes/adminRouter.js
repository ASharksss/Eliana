const Router = require('express')
const AdminController = require("../controllers/adminController");
const UserController = require("../controllers/userController");
const router = new Router()

router.get('/',)
router.post('/registration', AdminController.registrationUsers)
router.post('/addTypeConsumable', AdminController.addTypeConsumable)
router.post('/addPerfume', AdminController.addPerfume)
router.post('/addRole', AdminController.addRole)
router.post('/addTypeStock', AdminController.addTypeStock)
router.post('/addTypeFlavoring', AdminController.addTypeFlavoring)


module.exports = router