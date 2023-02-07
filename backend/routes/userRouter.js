const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')


router.post('/addConsume', UserController.addConsumable)
router.post('/addSolution', UserController.addSolution)
router.post('/addComplete', UserController.addComplete)
router.post('/addArchive', UserController.addArchive)
router.get('/', (req, res) => {
  res.json({message: 'I am alive'})
})


module.exports = router