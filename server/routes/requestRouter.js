const Router = require('express')
const router = new Router()
const requestController = require('../controller/requestController')
const authMiddleware = require('../middleware/authMiddleware')
const checkMiddleWare = require('../middleware/checkMiddleWare')

router.post('/add', requestController.addRequest)
router.post('/delete', checkMiddleWare("ADMIN"), requestController.deleteRequest)
router.get('/find', requestController.findAllRequest)
router.get('/findmy', requestController.findMyRequest)
router.put('/edit', requestController.editRequest)

module.exports=router