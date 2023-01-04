const Router = require('express')
const router = new Router()
const carController = require('../controller/carController')
const checkMiddleWare = require('../middleware/checkMiddleWare')


router.get('/getall', carController.getAll)
router.post('/addcar', carController.addCar)
router.put('/editcar', carController.editCar)
router.post('/deletecar', carController.deleteCar)

module.exports=router