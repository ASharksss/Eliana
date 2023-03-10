const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/addConsume', UserController.addConsume)
router.post('/addSolution', UserController.addSolution)
router.post('/addComplete', UserController.addComplete)
router.post('/addArchive', UserController.addArchive)
router.post('/login', UserController.login)
router.post('/token', UserController.getUserByToken)



router.post('/auth', UserController.check)
router.get('/getConsumables', UserController.getConsumables)
router.get('/getConsumablesChemistry', UserController.getConsumablesChemistry)
router.get('/getConsumablesStickers', UserController.getConsumablesStickers)
router.get('/getSolutions', UserController.getSolute)
router.get('/getCompleteProducts', UserController.getCompleteProducts)
router.get('/getArchive', UserController.getArchive)


router.get('/getNamesConsumables', UserController.getNamesConsumables)
router.get('/getPerfumes', UserController.getPerfumes)
router.get('/getSelectsForComplete', UserController.getSelectsForComplete)
router.get('/addArchive' )


module.exports = router