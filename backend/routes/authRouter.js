const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')


router.get('/', authController.check)
router.post('/login', authController.login)



module.exports = router