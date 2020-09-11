const Sequelize = require('sequelize')
const db = require('../database')

const user = db.define('user',{
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false
    },
    
},
{timestamps: false}
)

module.exports = user