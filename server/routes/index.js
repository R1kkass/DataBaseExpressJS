const Router = require('express')
const router = new Router()

const carRouter = require('./carRouter')
const userRouter = require('./userRouter')
const requestRouter = require('./requestRouter')

router.use("/request", requestRouter)
router.use("/user", userRouter)
router.use("/car", carRouter)

module.exports=router