const Router = require('express')
const router = new Router()
const adminRouter = require('./adminRouter')
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')


router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/user', userRouter)

module.exports = router