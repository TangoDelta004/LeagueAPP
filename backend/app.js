var express = require('express');
const app = express()
var request = require('request');
const fetch = require("node-fetch");


key = 'RGAPI-734537a7-d3c7-4172-a4ce-fe8ed1fdfabe'


const summonername = 'Summonpwner'
var url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonername}?api_key=${key}`
console.log(url)


P1bestchampmastery = 0





const getp1info = (key, callback) => {


    request(url, (error, response, body) => {

        const data = JSON.parse(body)

        summonerid = ''
        accountid = ''

        callback(undefined, {
            summonerid: data.id,
            accountid: data.accountId
        })
    })
}


const getp1champmastery = (url, callback) => {


    request(url, (error, response, body) => {

        const data = JSON.parse(body)
        P1totalchampmastery=0
        for (i in data){
            P1totalchampmastery+= data[i].championPoints
        }

        callback(undefined, {
            P1bestchampid: data[0].championId,
            P1bestchampmastery: data[0].championPoints,
            P1totalchampmastery: P1totalchampmastery

        })
    })
}



getp1info(key, (error, data) => {
    console.log(data)
    summonerid = data.summonerid
    url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerid}?api_key=${key}`
    console.log(url)


    getp1champmastery(url, (error,data) => {
        console.log(data)
        this.P1bestchampmastery = data.P1bestchampmastery
        console.log(this.P1bestchampmastery)
    })








})





module.exports = app