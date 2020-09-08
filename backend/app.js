var express = require('express');
const app = express()
var cors = require('cors')
var request = require('request');
const bodyParser = require('body-parser')
const getinfo = require('./getinfo')
const fs = require('fs')
const db = require('./database')
const user = require('./models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// authenticating DB connection

db.authenticate().then(() => console.log('database connected')).catch(err => console.log(err))




finish = false
var key = ''

//reading the API key from a local file
fs.readFile('../APIkey.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  key = data
})



db.sync().then(result => {
  console.log("all good")
}).catch(err => {
  console.log(err)
}) 


app.use(cors())
app.use(bodyParser.json())



app.get('/test', (req,res,next)=>{
  console.log(req.session.isLoggedIn)
  res.send({dummy:'dummy'})
})


app.post('/adduser', (req, res, next) => {
  const post = req.body
  bcrypt.hash(post.password,10).then(hash=>{
    let password = hash
    user.create({
      user: post.username,
      password:password 
  
    }).then(result => {console.log("created user")}).catch(err=>{console.log(err)})
    res.send({response: "done"})

  })



})

app.post('/login', (req, res, next) => {
  let fetcheduser
  const post = req.body
  let username = post.username
  //find user in postgres DB by Primary key username
  user.findByPk(username).then(
    user => {
      fetcheduser = user
      //compare the request password with the stored password. NOTE: that we are comparing the hash, not the real password.
      return bcrypt.compare(req.body.password,user.password)
    })
    .then(result =>{
      //if the comparison is true, then create the token and send it to the application
      if (result == true){
        const token = jwt.sign({user:fetcheduser.user},"tempsecret",{expiresIn:'1h'})
        res.status(200).json({
          response:token
        })
      }
      else {
        res.send({response: "error"})
      }
    }).catch(err=>{
    res.send({response:"error"})
  })
})



async function callgetinfo(post, key, res) {
  var response = await getinfo.getinfo(post, key)
  res.send(response)
}

app.post('/api/getinfo', (req, res, next) => {
  const post = req.body
  callgetinfo(post, key, res)
})

module.exports = app