const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')


router.get('/auth', authController.check)
router.post('/login', authController.login)



module.exports = router