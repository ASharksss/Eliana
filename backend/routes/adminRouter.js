const Router = require('express')
const AdminController = require("../controllers/adminController");
const router = new Router()

router.get('/',)
router.post('/registration', AdminController.registrationUsers)


module.exports = router