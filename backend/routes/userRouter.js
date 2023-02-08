const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')


router.post('/addConsume', UserController.addConsume)
router.post('/addSolution', UserController.addSolution)
router.post('/addComplete', UserController.addComplete)
router.post('/addArchive', UserController.addArchive)



router.get('/', (req, res) => {
  res.json({message: 'get Consume'})
})
router.get('/solute', (req, res) => {
  res.json({message: 'get Solute'})
})
router.get('/completeProducts', (req, res) => {
  res.json({message: 'get Complete products'})
})
router.get('/archive', (req, res) => {
  res.json({message: 'get Archive'})
})


router.get('/addConsume', (req, res) => {
  res.json({message: 'get add consume'})
})
router.get('/addSolution', (req, res) => {
  res.json({message: 'get add solution'})
})
router.get('/addComplete', (req, res) => {
  res.json({message: 'get add complete'})
})
router.get('/addArchive', (req, res) => {
  res.json({message: 'get add archive'})
})




module.exports = router