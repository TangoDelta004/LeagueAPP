const Sequelize = require('sequelize')
const db = require('../database')

const user = db.define('user',{
    user: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false
    }
})

module.exports = user