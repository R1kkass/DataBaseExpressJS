const ApiError = require("../error/ApiError")
const {Request} = require('../models/models')
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken')

class RequestController{
    async addRequest(req, res){
        try{
        const {email="none", text="none", category = "none", time="none"} = req.body
        console.log(email);
        const data = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
        const addReq = await Request.create({email:email.email, text,data, category, time, status: 'Еще непросмотрено'})
        console.log("true-----------------");
        return res.json({addReq})
    }catch(e){
        return ApiError.badRequest(e.message)
    }
    }

    async deleteRequest(req, res){
        try{
        const {id} = req.body
        const deleteReq = await Request.destroy({where:{id}})
        return res.json({deleteReq})
    }catch(e){
        return ApiError.badRequest(e.message)
    }
    }

    async findAllRequest(req, res){
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log('--------------------------------------------------');
        let {limit, page, query, sort, pole, search ="text"} = req.query
        page = page || 1
        query = query || ''
        pole=pole || 'id'
        sort = sort || 'DESC'
        limit = Number(limit) || 9
        let offset = page * limit - limit
        let findRequest
        if(decoded.role == "ADMIN"){
        findRequest = await Request.findAndCountAll({where: [{[search]: {[Op.like]:'%' + query + '%'}}],limit, offset, order:[[pole,sort]]})
        }else if(decoded.role == "DRIVER"){
            findRequest = await Request.findAndCountAll({where: {text: {[Op.like]:'%' + query + '%'}, category: 'Поездка'},limit, offset, order:[[pole,sort]]})
        }
        
        return res.json(findRequest)
    }catch(e){
        return ApiError.badRequest(e.message)
    }
    }

    async findMyRequest(req, res){
        try{
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            let {limit, page, query, sort, pole, login,search} = req.query
            page = page || 1
            query = query || ''
            pole=pole || 'id'
            sort = sort || 'DESC'
            search=search || 'text'
            login=login || ''
            console.log(login);
            limit = Number(limit) || 9
            let offset = page * limit - limit
            let findRequest = await Request.findAndCountAll({where: {[search]: {[Op.like]:'%' + query + '%'},email: decoded.email},limit, offset, order:[[pole,sort]]})
            return res.json(findRequest)
        }catch(e){
            return ApiError.badRequest(e.message)
        }
        }

    async editRequest(req, res){
        try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const {status, id} = req.body
        let findRequest
        if(decoded.role == "ADMIN"){
        findRequest = await Request.update({status},{where: {id}})
        }else if(decoded.role == "DRIVER"){
            findRequest = await Request.update({status},{where: {id,category:"Поездка"}})
        }
        return res.json({findRequest})
    }catch(e){
        return ApiError.badRequest(e.message)
    }
    }
}

module.exports = new RequestController()