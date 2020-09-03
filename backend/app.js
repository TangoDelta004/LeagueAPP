var express = require('express');
const app = express()
var request = require('request');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const getinfo = require('./getinfo')
const fs = require('fs')



// setting up the PostgreSQL database
const Sequelize = require('sequelize')
const db = new Sequelize('postgres://postgres:leaguepass@localhost:5432/LeagueAPP') // Example for postgres
db.authenticate().then(() => console.log('database connected')).catch(err => console.log(err))




finish = false
var key=''

fs.readFile('../APIkey.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    key = data
  })






app.use(bodyParser.json())

app.get('/users', (req, res, next) => {
    res.send("users")


})

async function callgetinfo(post,key,res){
    var response = await getinfo.getinfo(post,key)
    res.send(response)
}

app.post('/api/getinfo', (req, res,next) => {
    const post = req.body
    callgetinfo(post,key,res)

   // res.send(response)
     

        
       
  
    
    


})

module.exports = app