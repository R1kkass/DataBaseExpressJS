const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req, res, next){
        try{
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }catch(e){
        return ApiError.badRequest(e.message)
    }
    }

    async login(req, res, next){
        try{
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }catch(e){
        return ApiError.badRequest(e.message)
    }
    } 

    async check(req, res, next){
        // const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.send('user')
    } 

    async getOne(req, res){
        try{
        const {email} = req.query
        const user = await User.findOne({where: {email}})
        return res.json({user})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }

    async getAll(req, res){
        try{
        let {email,role, limit, page, pole, sort} = req.query
        email = email || ''
        limit = limit || 10
        page = page || 1
        let offset = page * limit - limit
        role = role || ''
        let user = await User.findAndCountAll({where: {email: {[Op.like]:'%' + email +'%'}}, limit, offset, order:[[pole,sort]]})
        console.log(user);
        return res.json({user})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }

    async edit(req, res){
        try{
        let {id,role} = req.body
        let user = await User.update(
            {role: role},
            {where: {id: id}})
        return res.json({user})
        }catch(e){
            return ApiError.badRequest(e.message)
        }
    }
}

module.exports = new UserController()