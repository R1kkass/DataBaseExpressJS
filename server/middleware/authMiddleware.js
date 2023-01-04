const jwt = require('jsonwebtoken')

module.exports = function (){
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(402).json({message: "Вы не авторизованы", bool: false})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            return res.status(200).json({message: "Авторизованы", bool: true})
        } catch(e){
            return res.status(401).json({message: "Вы не авторизованы", bool: false})
        }
    }
}