var express = require('express');
const app = express()
var request = require('request');
const bodyParser = require('body-parser')

finish1 = false
finish2 = false


key = 'RGAPI-ca956a3d-4527-4177-8ab9-122561da818b'




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

function dostuff2(res){
    console.log('doing stuff')
    res.send({dummy:'dummy'})
}


function checkifdone(res){
    console.log("checking.....")
    if (finish1 == true && finish2 == true){
        finish1 = false
        finish2 = false
        console.log("SENDING")
        res.send({dummy:'dummy'})
        return
        }
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

function dostuff(res,post) {
    console.log(post)
    P1summonername = post.name1
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
            P2summonername = post.name2
            url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${P2summonername}?api_key=${key}`

            //get p2 info
            getrequest(url, (error, data) => {

                P2summonerid = data.data.id
                P2accountid = data.data.accountId

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

                    P2totalchampmastery = numberWithCommas(P2totalchampmastery)
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

                                    P1kills = 0
                                    P1deaths = 0
                                    P1assists = 0
                                    P1cs = 0
                                    P1vs = 0
                                    P1totaldamage = 0
                                    P1objdamage = 0
                                    P1turretdamage = 0
                                    P1turretkills = 0
                                    P1inhibkills = 0
                                    P1killingspree = 0
                                    P1multikill = 0
                                    P1allyjungle = 0
                                    P1enemyjungle = 0
                                    P1visionwards = 0
                                    P1wardskilled = 0
                                    P1dragonkills = 0
                                    P1baronkills = 0
                                    P1riftkills = 0
                                    P1creepspermin10 = 0
                                    P1creepspermin20 = 0
                                    P1csdiff10 = 0
                                    P1csdiff20 = 0
                                    P1goldpermin10 = 0
                                    P1goldpermin20 = 0
                                    P1xppermin10 = 0
                                    P1xppermin20 = 0
                                    P1xpdiffpermin10 = 0
                                    P1xpdiffpermin20 = 0


                                    cpm10count = 0
                                    cpm20count = 0
                                    csd10count = 0
                                    csd20count = 0
                                    xpd10count = 0
                                    xpd20count = 0
                                    xpm10count = 0
                                    xpm20count = 0
                                    gpm10count = 0
                                    gpm20count = 0


                                    counter = 0

                                    for (var i = 0; i < 3; i++) {
                                        console.log(data.data.matches[i].gameId)
                                        P1gameid = data.data.matches[i].gameId
                                        url = `https://na1.api.riotgames.com/lol/match/v4/matches/${P1gameid}?api_key=${key}`

                                        getrequest(url, (error, data) => {

                                            for (var i = 0; i < data.data.participantIdentities.length; i++) {
                                                if (P1summonername.toLowerCase() == data.data.participantIdentities[i].player.summonerName.toLowerCase()) {
                                                    P1participantid = data.data.participantIdentities[i].participantId
                                                }
                                            }

                                            for (var i = 0; i < data.data.participants.length; i++) {
                                                if (P1participantid == data.data.participants[i].participantId) {

                                                    P1teamid = data.data.participants[i].teamId

                                                    if (P1teamid == 100) {
                                                        P1dragonkills += parseInt(data.data.teams[0].dragonKills)
                                                        P1baronkills += parseInt(data.data.teams[0].baronKills)
                                                        P1riftkills += parseInt(data.data.teams[0].riftHeraldKills)

                                                    }
                                                    if (P1teamid == 200) {
                                                        P1dragonkills += parseInt(data.data.teams[1].dragonKills)
                                                        P1baronkills += parseInt(data.data.teams[1].baronKills)
                                                        P1riftkills += parseInt(data.data.teams[1].riftHeraldKills)
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

                                                    if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas) != 'undefined') {
                                                        if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas["0-10"]) != 'undefined') {
                                                            P1creepspermin10 += parseInt(data.data.participants[i].timeline.creepsPerMinDeltas["0-10"], 10)

                                                            cpm10count += 1
                                                        }
                                                    }

                                                    if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas) != 'undefined') {
                                                        if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas["10-20"]) != 'undefined') {
                                                            P1creepspermin20 += parseInt(data.data.participants[i].timeline.creepsPerMinDeltas["10-20"], 10)
                                                            cpm20count += 1
                                                        }
                                                    }

                                                    if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas) != 'undefined') {
                                                        if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas["0-10"]) != 'undefined') {
                                                            P1csdiff10 += parseInt(data.data.participants[i].timeline.csDiffPerMinDeltas["0-10"], 10)
                                                            csd10count += 1
                                                        }
                                                    }
                                                    if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas) != 'undefined') {
                                                        if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas["10-20"]) != 'undefined') {
                                                            P1csdiff20 += parseInt(data.data.participants[i].timeline.csDiffPerMinDeltas["10-20"], 10)
                                                            csd20count += 1
                                                        }
                                                    }
                                                    if (typeof (data.data.participants[i].timeline.goldPerMinDeltas) != 'undefined') {
                                                        if (typeof (data.data.participants[i].timeline.goldPerMinDeltas["0-10"]) != 'undefined') {
                                                            P1goldpermin10 += parseInt(data.data.participants[i].timeline.goldPerMinDeltas["0-10"], 10)
                                                            gpm10count += 1
                                                        }
                                                    }
                                                    if (typeof (data.data.participants[i].timeline.goldPerMinDeltas) != 'undefined') {
                                                        if (typeof (data.data.participants[i].timeline.goldPerMinDeltas["10-20"]) != 'undefined') {
                                                            P1goldpermin20 += parseInt(data.data.participants[i].timeline.goldPerMinDeltas["10-20"], 10)
                                                            gpm20count += 1
                                                        }
                                                    }

                                                    if (typeof (data.data.participants[i].timeline.xpPerMinDeltas) != 'undefined') {
                                                        if (typeof (data.data.participants[i].timeline.xpPerMinDeltas["0-10"]) != 'undefined') {
                                                            P1xppermin10 += parseInt(data.data.participants[i].timeline.xpPerMinDeltas["0-10"], 10)
                                                            xpm10count += 1
                                                        }
                                                    }
                                                    if (typeof (data.data.participants[i].timeline.xpPerMinDeltas) != 'undefined') {
                                                        if (typeof (data.data.participants[i].timeline.xpPerMinDeltas["10-20"]) != 'undefined') {
                                                            P1xppermin20 += parseInt(data.data.participants[i].timeline.xpPerMinDeltas["10-20"], 10)
                                                            xpm20count += 1
                                                        }
                                                    }
                                                    if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas) != 'undefined') {
                                                        if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas["0-10"]) != 'undefined') {
                                                            P1xpdiffpermin10 += parseInt(data.data.participants[i].timeline.xpDiffPerMinDeltas["0-10"], 10)
                                                            xpd10count += 1
                                                        }
                                                    }
                                                    if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas) != 'undefined') {
                                                        if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas["10-20"]) != 'undefined') {
                                                            P1xpdiffpermin20 += parseInt(data.data.participants[i].timeline.xpDiffPerMinDeltas["10-20"], 10)
                                                            xpd20count += 1
                                                        }
                                                    }


                                                }

                                            }
                                            counter += 1
                                            console.log("counter: " + counter)

                                            if (counter == 3) {

                                                P1totaldamage = Math.round(P1totaldamage / 3)

                                                P1cs = Math.round(P1cs / 3)
                                                P1vs = Math.round(P1vs / 3)
                                                P1kills = Math.round((P1kills / 3))
                                                P1deaths = Math.round(P1deaths / 3)
                                                P1assists = Math.round(P1assists / 3)
                                                P1objdamage = Math.round(P1objdamage / 3)
                                                P1turretdamage = Math.round(P1turretdamage / 3)
                                                P1turretkills = Math.round(P1turretkills / 3)
                                                P1inhibkills = Math.round(P1inhibkills / 3)
                                                P1killingspree = Math.round(P1killingspree / 3)
                                                P1multikill = Math.round(P1multikill / 3)
                                                P1allyjungle = Math.round(P1allyjungle / 3)
                                                P1enemyjungle = Math.round(P1enemyjungle / 3)
                                                P1visionwards = Math.round(P1visionwards / 3)
                                                P1wardskilled = Math.round(P1wardskilled / 3)
                                                P1creepspermin10 = Math.round(P1creepspermin10 / cpm10count)
                                                P1creepspermin20 = Math.round(P1creepspermin20 / cpm20count)
                                                P1csdiff10 = Math.round(P1csdiff10 / csd10count)
                                                P1csdiff20 = Math.round(P1csdiff20 / csd20count)
                                                P1goldpermin10 = Math.round(P1goldpermin10 / gpm10count)
                                                P1goldpermin20 = Math.round(P1goldpermin20 / gpm20count)
                                                P1xppermin10 = Math.round(P1xppermin10 / xpm10count)
                                                P1xppermin20 = Math.round(P1xppermin20 / xpm20count)
                                                P1xpdiffpermin10 = Math.round(P1xpdiffpermin10 / xpd10count)
                                                P1xpdiffpermin20 = Math.round(P1xpdiffpermin20 / xpd20count)
                                                P1dragonkills = Math.round(P1dragonkills / 3)
                                                P1baronkills = Math.round(P1baronkills / 3)
                                                P1riftkills = Math.round(P1riftkills / 3)
                                                
                                                
                                                finish1 =true
                                                checkifdone(res)
                                            }


                                        })
                                        //the one below this is the for loop one

                                    }



































































































                                    url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${P2accountid}?api_key=${key}`

                                    getrequest(url, (error, data) => {

                                        P2kills = 0
                                        P2deaths = 0
                                        P2assists = 0
                                        P2cs = 0
                                        P2vs = 0
                                        P2totaldamage = 0
                                        P2objdamage = 0
                                        P2turretdamage = 0
                                        P2turretkills = 0
                                        P2inhibkills = 0
                                        P2killingspree = 0
                                        P2multikill = 0
                                        P2allyjungle = 0
                                        P2enemyjungle = 0
                                        P2visionwards = 0
                                        P2wardskilled = 0
                                        P2dragonkills = 0
                                        P2baronkills = 0
                                        P2riftkills = 0
                                        P2creepspermin10 = 0
                                        P2creepspermin20 = 0
                                        P2csdiff10 = 0
                                        P2csdiff20 = 0
                                        P2goldpermin10 = 0
                                        P2goldpermin20 = 0
                                        P2xppermin10 = 0
                                        P2xppermin20 = 0
                                        P2xpdiffpermin10 = 0
                                        P2xpdiffpermin20 = 0


                                        cpm10count2 = 0
                                        cpm20count2 = 0
                                        csd10count2 = 0
                                        csd20count2 = 0
                                        xpd10count2 = 0
                                        xpd20count2 = 0
                                        xpm10count2 = 0
                                        xpm20count2 = 0
                                        gpm10count2 = 0
                                        gpm20count2 = 0

                                        counter2 = 0
                                        for (var i = 0; i < 3; i++) {
                                            console.log(data.data.matches[i].gameId)
                                            P2gameid = data.data.matches[i].gameId
                                            url = `https://na1.api.riotgames.com/lol/match/v4/matches/${P2gameid}?api_key=${key}`


                                            getrequest(url, (error, data) => {
                                                P2participantid = ''
                                                for (var i = 0; i < data.data.participantIdentities.length; i++) {
                                                    if (P2summonername.toLowerCase() == data.data.participantIdentities[i].player.summonerName.toLowerCase()) {
                                                        P2participantid = data.data.participantIdentities[i].participantId
                                                    }
                                                }

                                                for (var i = 0; i < data.data.participants.length; i++) {
                                                    if (P2participantid == data.data.participants[i].participantId) {
                                                        //console.log(data.data.teams)
                                                        P2teamid = data.data.participants[i].teamId

                                                        if (P2teamid == 100) {
                                                            P2dragonkills += parseInt(data.data.teams[0].dragonKills)
                                                            P2baronkills += parseInt(data.data.teams[0].baronKills)
                                                            P2riftkills += parseInt(data.data.teams[0].riftHeraldKills)

                                                        }
                                                        if (P2teamid == 200) {
                                                            P2dragonkills += parseInt(data.data.teams[1].dragonKills)
                                                            P2baronkills += parseInt(data.data.teams[1].baronKills)
                                                            P2riftkills += parseInt(data.data.teams[1].riftHeraldKills)
                                                        }


                                                        P2totaldamage += parseInt(data.data.participants[i].stats.totalDamageDealtToChampions, 10)
                                                        P2cs += parseInt(data.data.participants[i].stats.totalMinionsKilled, 10) + parseInt(data.data.participants[i].stats.neutralMinionsKilled, 10)

                                                        P2vs += parseInt(data.data.participants[i].stats.visionScore, 10)
                                                        P2kills += parseInt(data.data.participants[i].stats.kills, 10)
                                                        P2deaths += parseInt(data.data.participants[i].stats.deaths, 10)
                                                        P2assists += parseInt(data.data.participants[i].stats.assists, 10)
                                                        P2objdamage += parseInt(data.data.participants[i].stats.damageDealtToObjectives, 10)
                                                        P2turretdamage += parseInt(data.data.participants[i].stats.damageDealtToTurrets, 10)
                                                        P2turretkills += parseInt(data.data.participants[i].stats.turretKills, 10)
                                                        P2inhibkills += parseInt(data.data.participants[i].stats.inhibitorKills, 10)
                                                        P2killingspree += parseInt(data.data.participants[i].stats.largestKillingSpree, 10)
                                                        P2multikill += parseInt(data.data.participants[i].stats.largestMultiKill, 10)
                                                        P2allyjungle += parseInt(data.data.participants[i].stats.neutralMinionsKilledTeamJungle, 10)
                                                        P2enemyjungle += parseInt(data.data.participants[i].stats.neutralMinionsKilledEnemyJungle, 10)
                                                        P2visionwards += parseInt(data.data.participants[i].stats.visionWardsBoughtInGame, 10)
                                                        P2wardskilled += parseInt(data.data.participants[i].stats.wardsKilled, 10)

                                                        if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas) != 'undefined') {
                                                            if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas["0-10"]) != 'undefined') {
                                                                P2creepspermin10 += parseInt(data.data.participants[i].timeline.creepsPerMinDeltas["0-10"], 10)

                                                                cpm10count += 1
                                                            }
                                                        }

                                                        if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas) != 'undefined') {
                                                            if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas["10-20"]) != 'undefined') {
                                                                P2creepspermin20 += parseInt(data.data.participants[i].timeline.creepsPerMinDeltas["10-20"], 10)
                                                                cpm20count += 1
                                                            }
                                                        }

                                                        if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas) != 'undefined') {
                                                            if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas["0-10"]) != 'undefined') {
                                                                P2csdiff10 += parseInt(data.data.participants[i].timeline.csDiffPerMinDeltas["0-10"], 10)
                                                                csd10count += 1
                                                            }
                                                        }
                                                        if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas) != 'undefined') {
                                                            if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas["10-20"]) != 'undefined') {
                                                                P2csdiff20 += parseInt(data.data.participants[i].timeline.csDiffPerMinDeltas["10-20"], 10)
                                                                csd20count += 1
                                                            }
                                                        }
                                                        if (typeof (data.data.participants[i].timeline.goldPerMinDeltas) != 'undefined') {
                                                            if (typeof (data.data.participants[i].timeline.goldPerMinDeltas["0-10"]) != 'undefined') {
                                                                P2goldpermin10 += parseInt(data.data.participants[i].timeline.goldPerMinDeltas["0-10"], 10)
                                                                gpm10count += 1
                                                            }
                                                        }
                                                        if (typeof (data.data.participants[i].timeline.goldPerMinDeltas) != 'undefined') {
                                                            if (typeof (data.data.participants[i].timeline.goldPerMinDeltas["10-20"]) != 'undefined') {
                                                                P2goldpermin20 += parseInt(data.data.participants[i].timeline.goldPerMinDeltas["10-20"], 10)
                                                                gpm20count += 1
                                                            }
                                                        }

                                                        if (typeof (data.data.participants[i].timeline.xpPerMinDeltas) != 'undefined') {
                                                            if (typeof (data.data.participants[i].timeline.xpPerMinDeltas["0-10"]) != 'undefined') {
                                                                P2xppermin10 += parseInt(data.data.participants[i].timeline.xpPerMinDeltas["0-10"], 10)
                                                                xpm10count += 1
                                                            }
                                                        }
                                                        if (typeof (data.data.participants[i].timeline.xpPerMinDeltas) != 'undefined') {
                                                            if (typeof (data.data.participants[i].timeline.xpPerMinDeltas["10-20"]) != 'undefined') {
                                                                P2xppermin20 += parseInt(data.data.participants[i].timeline.xpPerMinDeltas["10-20"], 10)
                                                                xpm20count += 1
                                                            }
                                                        }
                                                        if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas) != 'undefined') {
                                                            if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas["0-10"]) != 'undefined') {
                                                                P2xpdiffpermin10 += parseInt(data.data.participants[i].timeline.xpDiffPerMinDeltas["0-10"], 10)
                                                                xpd10count += 1
                                                            }
                                                        }
                                                        if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas) != 'undefined') {
                                                            if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas["10-20"]) != 'undefined') {
                                                                P2xpdiffpermin20 += parseInt(data.data.participants[i].timeline.xpDiffPerMinDeltas["10-20"], 10)
                                                                xpd20count += 1
                                                            }
                                                        }


                                                    }

                                                }
                                                counter2 += 1
                                                console.log('counter2: ' + counter2)
                                                if (counter2 == 3) {
                                                    P2totaldamage = Math.round(P2totaldamage / 3)
                                                    P2cs = Math.round(P2cs / 3)
                                                    P2vs = Math.round(P2vs / 3)
                                                    P2kills = Math.round((P2kills / 3))
                                                    P2deaths = Math.round(P2deaths / 3)
                                                    P2assists = Math.round(P2assists / 3)
                                                    P2objdamage = Math.round(P2objdamage / 3)
                                                    P2turretdamage = Math.round(P2turretdamage / 3)
                                                    P2turretkills = Math.round(P2turretkills / 3)
                                                    P2inhibkills = Math.round(P2inhibkills / 3)
                                                    P2killingspree = Math.round(P2killingspree / 3)
                                                    P2multikill = Math.round(P2multikill / 3)
                                                    P2allyjungle = Math.round(P2allyjungle / 3)
                                                    P2enemyjungle = Math.round(P2enemyjungle / 3)
                                                    P2visionwards = Math.round(P2visionwards / 3)
                                                    P2wardskilled = Math.round(P2wardskilled / 3)
                                                    P2creepspermin10 = Math.round(P2creepspermin10 / cpm10count)
                                                    P2creepspermin20 = Math.round(P2creepspermin20 / cpm20count)
                                                    P2csdiff10 = Math.round(P2csdiff10 / csd10count)
                                                    P2csdiff20 = Math.round(P2csdiff20 / csd20count)
                                                    P2goldpermin10 = Math.round(P2goldpermin10 / gpm10count)
                                                    P2goldpermin20 = Math.round(P2goldpermin20 / gpm20count)
                                                    P2xppermin10 = Math.round(P2xppermin10 / xpm10count)
                                                    P2xppermin20 = Math.round(P2xppermin20 / xpm20count)
                                                    P2xpdiffpermin10 = Math.round(P2xpdiffpermin10 / xpd10count)
                                                    P2xpdiffpermin20 = Math.round(P2xpdiffpermin20 / xpd20count)
                                                    P2dragonkills = Math.round(P2dragonkills / 3)
                                                    P2baronkills = Math.round(P2baronkills / 3)
                                                    P2riftkills = Math.round(P2riftkills / 3)
                                                    
                                                    finish2= true
                                                    checkifdone(res)
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








    })

}
app.use(bodyParser.json())


app.post('/api/posts', (req, res, next) => {
    const post = req.body
    console.log("HERE")
    console.log(post)
    dostuff(res,post)
    

})

app.use('/api/posts', (req, res, next) => {

    const obj = {
        P1summonername:P1summonername,
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
        P1riftkills: P1riftkills,
        P1creepspermin10: P1creepspermin10,
        P1creepspermin20: P1creepspermin20,
        P1csdiff10: P1csdiff10,
        P1csdiff20: P1csdiff20,
        P1goldpermin10: P1goldpermin10,
        P1goldpermin20: P1goldpermin20,
        P1xppermin10: P1xppermin10,
        P1xppermin20: P1xppermin20,
        P1xpdiffpermin10: P1xpdiffpermin10,
        P1xpdiffpermin20: P1xpdiffpermin20,

        P2summonername:P2summonername,
        P2kills: P2kills,
        P2deaths: P2deaths,
        P2assists: P2assists,
        P2cs: P2cs,
        P2vs: P2vs,
        P2totaldamage: P2totaldamage,
        P2objdamage: P2objdamage,
        P2turretdamage: P2turretdamage,
        P2turretkills: P2turretkills,
        P2inhibkills: P2inhibkills,
        P2killingspree: P2killingspree,
        P2multikill: P2multikill,
        P2allyjungle: P2allyjungle,
        P2enemyjungle: P2enemyjungle,
        P2visionwards: P2visionwards,
        P2wardskilled: P2wardskilled,
        P2dragonkills: P2dragonkills,
        P2baronkills: P2baronkills,
        P2riftkills: P2riftkills,
        P2creepspermin10: P2creepspermin10,
        P2creepspermin20: P2creepspermin20,
        P2csdiff10: P2csdiff10,
        P2csdiff20: P2csdiff20,
        P2goldpermin10: P2goldpermin10,
        P2goldpermin20: P2goldpermin20,
        P2xppermin10: P2xppermin10,
        P2xppermin20: P2xppermin20,
        P2xpdiffpermin10: P2xpdiffpermin10,
        P2xpdiffpermin20: P2xpdiffpermin20,
    }

    res.json(obj)
})

module.exports = app