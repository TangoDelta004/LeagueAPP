var express = require('express');
const app = express()
var cors = require('cors')
var request = require('request');
const bodyParser = require('body-parser')
const getinfo = require('./getinfo')
const fs = require('fs')
const db = require('./database')
const user = require('./models/User')

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

app.post('/adduser', (req, res, next) => {
  const post = req.body
  let username = post.username
  let password = post.password
  user.create({
    user: username,
    password:password 

  }).then(result => {console.log("created user")}).catch(err=>{console.log(err)})
  res.send({response: "done"})

})

app.post('/getuser', (req, res, next) => {
  const post = req.body
  let username = post.username
  let password = post.password
  user.findByPk(username).then(
    user => {
      console.log(user.dataValues)
      res.send(user.dataValues)
    }
  ).catch(err=>{
    res.send({error:err})
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