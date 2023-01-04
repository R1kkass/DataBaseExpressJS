const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    
})

const Request = sequelize.define('request', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING },
    data: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING},  
    category: {type: DataTypes.STRING},
    time: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING, defaultValue:"Ещё не просмотрено"}
})

const Car = sequelize.define('car', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING },
    number: {type: DataTypes.STRING, unique: true},
    year: {type: DataTypes.STRING,defaultValue:'none'},
})

const Road = sequelize.define('road', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    from: {type: DataTypes.STRING },
})

module.exports = {
    User,
    Request,
    Car,
    Road
}

Request.hasMany(Road)
Road.belongsTo(Request)
