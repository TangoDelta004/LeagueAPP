var express = require('express');
const app = express()
var request = require('request');
const bodyParser = require('body-parser')



key = 'RGAPI-24c63c4b-cab9-49e4-acdc-f77353cc2ac0'






P1bestchampmastery = 0
P1bestchamp = ''
P1totalchampmastery = 0
P1tier = ''
P1rank = ''
P1ratio = 0

P2bestchampmastery = 0
P2bestchamp = ''
P2totalchampmastery = 0
P2tier = ''
P2rank = ''
P2ratio = 0



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const getp1info = (key, callback) => {


    request(url, (error, response, body) => {

        const data = JSON.parse(body)

        P1summonerid = ''
        P1accountid = ''

        callback(undefined, {
            P1summonerid: data.id,
            P1accountid: data.accountId
        })
    })
}


const getp1champmastery = (url, callback) => {


    request(url, (error, response, body) => {

        const data = JSON.parse(body)

        P1totalchampmastery = 0
        for (i in data) {
            P1totalchampmastery += data[i].championPoints
        }

        callback(undefined, {
            P1bestchampid: data[0].championId,
            P1bestchampmastery: data[0].championPoints,
            P1totalchampmastery: P1totalchampmastery

        })
    })
}


const getp2champmastery = (url, callback) => {


    request(url, (error, response, body) => {

        const data = JSON.parse(body)
        P2totalchampmastery = 0
        for (i in data) {
            P2totalchampmastery += data[i].championPoints
        }

        callback(undefined, {
            P2bestchampid: data[0].championId,
            P2bestchampmastery: data[0].championPoints,
            P2totalchampmastery: P2totalchampmastery

        })
    })
}


const getp2info = (url, callback) => {

    request(url, (error, response, body) => {

        const data = JSON.parse(body)
        P2summonerid = ''
        P2accountid = ''

        callback(undefined, {
            P2summonerid: data.id,
            P2accountid: data.accountId
        })
    })
}


const getlistofchamps = (url, callback) => {

    request(url, (error, response, body) => {

        const data = JSON.parse(body)

        // for(i in data.data){
        //     console.log(i)
        // }

        callback(undefined, {
            data: data
        })
    })
}

const getp1elo = (url, callback) => {

    request(url, (error, response, body) => {

        const data = JSON.parse(body)



        callback(undefined, {
            data: data
        })
    })
}
const getp2elo = (url, callback) => {

    request(url, (error, response, body) => {

        const data = JSON.parse(body)



        callback(undefined, {
            data: data
        })
    })
}
const getp1matches = (url, callback) => {

    request(url, (error, response, body) => {

        const data = JSON.parse(body)
        //console.log(data)


        callback(undefined, {
            data: data
        })
    })
}


const getp1game = (url, callback) => {

    request(url, (error, response, body) => {

        const data = JSON.parse(body)
        //console.log(data)


        callback(undefined, {
            data: data
        })
    })
}



//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------

//function dostuff() {
const summonername = 'Summonpwner'
var url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonername}?api_key=${key}`
console.log(url)
getp1info(key, (error, data) => {
    P1summonername= "Summonpwner"
    P1summonerid = data.P1summonerid
    P1accountid = data.P1accountid
    url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${P1summonerid}?api_key=${key}`



    getp1champmastery(url, (error, data) => {
        P1bestchampid = data.P1bestchampid
        this.P1bestchampmastery = data.P1bestchampmastery
        this.P1bestchampmastery = numberWithCommas(this.P1bestchampmastery)
        console.log("P1 BEST CHAMP MASTERY: " + this.P1bestchampmastery)
        this.P1totalchampmastery = data.P1totalchampmastery
        this.P1totalchampmastery = numberWithCommas(this.P1totalchampmastery)
        console.log("P1 TOTAL CHAMP MASTERY: " + this.P1totalchampmastery)
        P2summonername = "kithor"
        url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${P2summonername}?api_key=${key}`


        getp2info(url, (error, data) => {

            P2summonerid = data.P2summonerid
            P2accountid = data.P2accountid
            url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${P2summonerid}?api_key=${key}`



            getp2champmastery(url, (error, data) => {
                P2bestchampid = data.P2bestchampid
                this.P2bestchampmastery = data.P2bestchampmastery
                this.P2bestchampmastery = numberWithCommas(this.P2bestchampmastery)
                console.log("P2 BEST CHAMP MASTERY: " + this.P2bestchampmastery)
                this.P2totalchampmastery = data.P2totalchampmastery
                this.P2totalchampmastery = numberWithCommas(this.P2totalchampmastery)
                console.log("P2 TOTAL CHAMP MASTERY: " + this.P2totalchampmastery)

                url = "http://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json"

                getlistofchamps(url, (error, data) => {
                    //console.log(data.data.data.Ahri)
                    console.log(P1bestchampid)
                    console.log(P2bestchampid)
                    for (var i in data.data.data) {
                        if (data.data.data.hasOwnProperty(i)) {
                            if (P1bestchampid == data.data.data[i].key) {
                                this.P1bestchamp = data.data.data[i].id
                            }
                            if (P2bestchampid == data.data.data[i].key) {
                                this.P2bestchamp = (data.data.data[i].id)
                            }
                        }
                    }


                    url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${P1summonerid}?api_key=${key}`
                    getp1elo(url, (error, data) => {
                        for (var i in data.data) {
                            if (data.data[i].queueType == "RANKED_SOLO_5x5") {

                                this.P1rank = data.data[i].rank
                                this.P1tier = data.data[i].tier
                                this.P1ratio = Math.round((data.data[i].wins / (data.data[i].wins + data.data[i].losses)) * 100)

                            }
                        }
                        console.log("P1 Rank: " + this.P1rank)
                        console.log("P1 Tier: " + this.P1tier)
                        console.log("P1 Ratio: " + this.P1ratio)

                        url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${P2summonerid}?api_key=${key}`
                        getp2elo(url, (error, data) => {
                            for (var i in data.data) {
                                if (data.data[i].queueType == "RANKED_SOLO_5x5") {

                                    this.P2rank = data.data[i].rank
                                    this.P2tier = data.data[i].tier
                                    this.P2ratio = Math.round((data.data[i].wins / (data.data[i].wins + data.data[i].losses)) * 100)

                                }
                            }
                            console.log("P2 Rank: " + this.P2rank)
                            console.log("P2 Tier: " + this.P2tier)
                            console.log("P2 Ratio: " + this.P2ratio)



                            url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${P1accountid}?api_key=${key}`

                            getp1matches(url, (error, data) => {
                                //console.log(data.data.matches[0])
                                //  for (var i = 0; i < 1; i++){
                                console.log(data.data.matches[i].gameId)
                                p1gameid = data.data.matches[i].gameId
                                url = `https://na1.api.riotgames.com/lol/match/v4/matches/${p1gameid}?api_key=${key}`

                                getp1game(url, (error, data) => {
                                    console.log(P1summonername)
                                    for (var i = 0; i < data.data.participantIdentities.length; i++) {
                                        if (P1summonername == data.data.participantIdentities[i].player.summonerName) {
                                            console.log(data.data.participantIdentities[i].participantId)
                                        }
                                    }
                                })

                                //  }

                            })

                        })
                    })


                })



            })

        })

    })








})
//}
app.use(bodyParser.json())


app.post('/api/posts', (req, res, next) => {
    const post = req.body
    console.log("HERE")
    console.log(post)
    //dostuff()

})

app.use('/api/posts', (req, res, next) => {

    const obj = {
        P1bestchampmastery: this.P1bestchampmastery,
        P1bestchamp: this.P1bestchamp,
        P1totalchampmastery: this.P1totalchampmastery,
        P2bestchampmastery: this.P2bestchampmastery,
        P2bestchamp: this.P2bestchamp,
        P2totalchampmastery: this.P2totalchampmastery
    }

    res.json(obj)
})

module.exports = app