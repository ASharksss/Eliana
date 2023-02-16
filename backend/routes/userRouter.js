const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const {noRawAttributes} = require("sequelize/lib/utils/deprecations");
const {Consumable} = require("../models/models");


router.post('/addConsume', UserController.addConsume)
router.post('/addSolution', UserController.addSolution)
router.post('/addComplete', UserController.addComplete)
router.post('/addArchive', UserController.addArchive)


router.get('/getConsumables', UserController.getConsumables)
router.get('/getSolutions', UserController.getSolute)
router.get('/getCompleteProducts', UserController.getCompleteProducts)
router.get('/getArchive', UserController.getArchive)


router.get('/addConsume', )
router.get('/addSolution', )
router.get('/addComplete', )
router.get('/addArchive', )




module.exports = router