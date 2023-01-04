const Router = require('express')
const router = new Router()
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')
const authMiddlewareCheck = require('../middleware/authMiddlewareCheck')
const checkMiddleWare = require('../middleware/checkMiddleWare')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/get', userController.getOne)
router.get('/getall', checkMiddleWare("ADMIN"),userController.getAll)
router.post('/authcheck', authMiddleware(), userController.check)
router.put('/edit', checkMiddleWare("ADMIN"), userController.edit)

module.exports=router