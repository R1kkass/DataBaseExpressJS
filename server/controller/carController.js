const ApiError = require("../error/ApiError")
const {Car} = require('../models/models')
const {Op} = require('sequelize')

class CarController{
    async getAll(req, res){
        try{
        let {name, limit, page, pole, sort} = req.query
        limit = limit || 10
        pole = pole || 'id'
        sort = sort || 'DESC'
        page = page || 1
        let offset = page * limit - limit
        name=name || ''
        let car = await Car.findAndCountAll({where: {name: {[Op.like]:'%' + name +'%'}}, limit, offset, order:[[pole || 'ASC', sort || 'DESC']]})
        return res.json({car})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }   

    async addCar(req, res){
        try{
        let {name, number, year} = req.body
        year = year || 10
        number = number || ''
        name = name || ''
        let car = await Car.create({name, year, number})
        return res.json({car})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }    
    
    async editCar(req, res){
        try{
        let {name, number, year, id} = req.body
        year = year || 'none'
        number = number || 'none'
        name = name || 'none'
        let car = await Car.update(
            {name, number, year},
            {where: {id: id}})
        return res.json({car})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }

    async deleteCar(req, res){
        try{
        let {id} = req.body
        let car = await Car.destroy({where: {id: id}})
        return res.json({car})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }
}

module.exports = new CarController()