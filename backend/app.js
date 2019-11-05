var express = require('express');
const app = express()
var request = require('request');
const bodyParser = require('body-parser')



key = 'RGAPI-1ad6f3e3-8f25-4345-b9d1-1980df46d415'




function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const getrequest = (url, callback) => {

    request(url, (error, response, body) => {

        const data = JSON.parse(body)



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
P1summonername = 'Summonpwner'
var url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${P1summonername}?api_key=${key}`
console.log(url)


//get p1 info
getrequest(url, (error, data) => {

    P1summonerid = data.data.id
    P1accountid = data.data.accountId

    url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${P1summonerid}?api_key=${key}`


    //get p1 champ mastery
    getrequest(url, (error, data) => {

        P1totalchampmastery = 0
        for (i in data.data) {
            P1totalchampmastery += data.data[i].championPoints
        }
        console.log(P1totalchampmastery)
        P1bestchampid = data.data[0].championId
        P1bestchampmastery = data.data[0].championPoints


        P1bestchampmastery = numberWithCommas(P1bestchampmastery)
        console.log("P1 BEST CHAMP MASTERY: " + P1bestchampmastery)

        P1totalchampmastery = numberWithCommas(P1totalchampmastery)
        console.log("P1 TOTAL CHAMP MASTERY: " + P1totalchampmastery)
        P2summonername = "kithor"
        url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${P2summonername}?api_key=${key}`

        //get p2 info
        getrequest(url, (error, data) => {

            P2summonerid = data.data.id
            P2accountid = data.data.accountid
            url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${P2summonerid}?api_key=${key}`


            //get p2 champ mastery
            getrequest(url, (error, data) => {

                P2totalchampmastery = 0
                for (i in data.data) {
                    P2totalchampmastery += data.data[i].championPoints
                }
                console.log(P2totalchampmastery)
                P2bestchampid = data.data[0].championId
                P2bestchampmastery = data.data[0].championPoints


                P2bestchampmastery = numberWithCommas(P2bestchampmastery)
                console.log("P2 BEST CHAMP MASTERY: " + P2bestchampmastery)

                P1totalchampmastery = numberWithCommas(P2totalchampmastery)
                console.log("P2 TOTAL CHAMP MASTERY: " + P2totalchampmastery)



                url = "http://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json"
                // request for ddragon to give me list of champions
                getrequest(url, (error, data) => {

                    console.log(P1bestchampid)
                    console.log(P2bestchampid)
                    for (var i in data.data.data) {
                        if (data.data.data.hasOwnProperty(i)) {
                            if (P1bestchampid == data.data.data[i].key) {
                                P1bestchamp = data.data.data[i].id
                            }
                            if (P2bestchampid == data.data.data[i].key) {
                                P2bestchamp = (data.data.data[i].id)
                            }
                        }
                    }


                    url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${P1summonerid}?api_key=${key}`
                    // get elo of p1
                    getrequest(url, (error, data) => {
                        for (var i in data.data) {
                            if (data.data[i].queueType == "RANKED_SOLO_5x5") {

                                P1rank = data.data[i].rank
                                P1tier = data.data[i].tier
                                P1ratio = Math.round((data.data[i].wins / (data.data[i].wins + data.data[i].losses)) * 100)

                            }
                        }
                        console.log("P1 Rank: " + P1rank)
                        console.log("P1 Tier: " + P1tier)
                        console.log("P1 Ratio: " + P1ratio)

                        url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${P2summonerid}?api_key=${key}`


                        //get elo of p2
                        getrequest(url, (error, data) => {
                            for (var i in data.data) {
                                if (data.data[i].queueType == "RANKED_SOLO_5x5") {

                                    P2rank = data.data[i].rank
                                    P2tier = data.data[i].tier
                                    P2ratio = Math.round((data.data[i].wins / (data.data[i].wins + data.data[i].losses)) * 100)

                                }
                            }
                            console.log("P2 Rank: " + P2rank)
                            console.log("P2 Tier: " + P2tier)
                            console.log("P2 Ratio: " + P2ratio)



                            url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${P1accountid}?api_key=${key}`

                            getrequest(url, (error, data) => {

                                P1kills=0
                                P1deaths=0
                                P1assists=0
                                P1cs=0
                                P1vs=0
                                P1totaldamage=0
                                P1objdamage=0
                                P1turretdamage=0
                                P1turretkills=0
                                P1inhibkills=0
                                P1killingspree=0
                                P1multikill=0
                                P1allyjungle=0
                                P1enemyjungle=0
                                P1visionwards=0
                                P1wardskilled=0
                                P1dragonkills=0
                                P1baronkills=0
                                P1riftkills=0
                        

                                for (var i = 0; i < 3; i++) {
                                    console.log(data.data.matches[i].gameId)
                                    p1gameid = data.data.matches[i].gameId
                                    url = `https://na1.api.riotgames.com/lol/match/v4/matches/${p1gameid}?api_key=${key}`

                                    getrequest(url, (error, data) => {

                                        for (var i = 0; i < data.data.participantIdentities.length; i++) {
                                            if (P1summonername == data.data.participantIdentities[i].player.summonerName) {
                                                P1participantid = data.data.participantIdentities[i].participantId
                                            }
                                        }

                                        for (var i = 0; i < data.data.participants.length; i++) {
                                            if (P1participantid == data.data.participants[i].participantId) {
                                                 //console.log(data.data.teams)
                                                P1teamid = data.data.participants[i].teamId

                                                if (P1teamid==100){
                                                    P1dragonkills+=parseInt(data.data.teams[0].dragonKills)
                                                    P1baronkills+=parseInt(data.data.teams[0].baronKills)
                                                    P1riftkills+=parseInt(data.data.teams[0].riftHeraldKills)
                  
                                                  }
                                                  if (P1teamid==200){
                                                    P1dragonkills+=parseInt(data.data.teams[1].dragonKills)
                                                    P1baronkills+=parseInt(data.data.teams[1].baronKills)
                                                    P1riftkills+=parseInt(data.data.teams[1].riftHeraldKills)
                                                  }


                                                P1totaldamage += parseInt(data.data.participants[i].stats.totalDamageDealtToChampions, 10)
                                                P1cs += parseInt(data.data.participants[i].stats.totalMinionsKilled, 10) + parseInt(data.data.participants[i].stats.neutralMinionsKilled, 10)

                                                P1vs += parseInt(data.data.participants[i].stats.visionScore, 10)
                                                P1kills += parseInt(data.data.participants[i].stats.kills, 10)
                                                P1deaths += parseInt(data.data.participants[i].stats.deaths, 10)
                                                P1assists += parseInt(data.data.participants[i].stats.assists, 10)
                                                P1objdamage += parseInt(data.data.participants[i].stats.damageDealtToObjectives, 10)
                                                P1turretdamage += parseInt(data.data.participants[i].stats.damageDealtToTurrets, 10)
                                                P1turretkills += parseInt(data.data.participants[i].stats.turretKills, 10)
                                                P1inhibkills += parseInt(data.data.participants[i].stats.inhibitorKills, 10)
                                                P1killingspree += parseInt(data.data.participants[i].stats.largestKillingSpree, 10)
                                                P1multikill += parseInt(data.data.participants[i].stats.largestMultiKill, 10)
                                                P1allyjungle += parseInt(data.data.participants[i].stats.neutralMinionsKilledTeamJungle, 10)
                                                P1enemyjungle += parseInt(data.data.participants[i].stats.neutralMinionsKilledEnemyJungle, 10)
                                                P1visionwards += parseInt(data.data.participants[i].stats.visionWardsBoughtInGame, 10)
                                                P1wardskilled += parseInt(data.data.participants[i].stats.wardsKilled, 10)


                                            }

                                        }



                                    })
                                    //the one below this is the for loop one
                                }

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
    //console.log("hmmm"+ this.P1cs)
    const obj = {
        P1bestchampmastery: P1bestchampmastery,
        P1bestchamp: P1bestchamp,
        P1totalchampmastery: P1totalchampmastery,
        P2bestchampmastery: P2bestchampmastery,
        P2bestchamp: P2bestchamp,
        P2totalchampmastery: P2totalchampmastery,
        P1rank: P1rank,
        P1tier: P1tier,
        P1ratio: P1ratio,
        P2rank: P2rank,
        P2tier: P2tier,
        P2ratio: P2ratio,


        P1kills: P1kills,
        P1deaths: P1deaths,
        P1assists: P1assists,
        P1cs: P1cs,
        P1vs: P1vs,
        P1totaldamage: P1totaldamage,
        P1objdamage: P1objdamage,
        P1turretdamage: P1turretdamage,
        P1turretkills: P1turretkills,
        P1inhibkills: P1inhibkills,
        P1killingspree: P1killingspree,
        P1multikill: P1multikill,
        P1allyjungle: P1allyjungle,
        P1enemyjungle: P1enemyjungle,
        P1visionwards: P1visionwards,
        P1wardskilled: P1wardskilled,
        P1dragonkills: P1dragonkills,
        P1baronkills: P1baronkills,
        P1riftkills: P1riftkills


    }

    res.json(obj)
})

module.exports = app