
var request = require('request');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



const getrequest = (url, callback) => {

    request(url, (error, response, body) => {

        var data = JSON.parse(body)

        if (data != undefined) {

            if (data.status != undefined) {
                if (data.status.status_code >= 400) {
                    data = "error"
                }
            }
            callback(undefined, {
                data: data
            })
        }
        else {
            callback("error", undefined)
        }
    })
}

module.exports = {
    getinfo: function getinfo(post, key) {
        return new Promise(resolve => {
            key = key
            summonername = post.name
            var url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonername}?api_key=${key}`

            //get player info
            getrequest(url, (error, data) => {
                if (data.data != "error") {
                    summonerid = data.data.id
                    accountid = data.data.accountId

                    url = `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerid}?api_key=${key}`



                    //get player champ mastery
                    getrequest(url, (error, data) => {

                        if (data.data != "error") {
                            totalchampmastery = 0
                            for (i in data.data) {

                                totalchampmastery += data.data[i].championPoints
                            }

                            bestchampid = data.data[0].championId
                            bestchampmastery = data.data[0].championPoints


                            bestchampmastery = numberWithCommas(bestchampmastery)


                            totalchampmastery = numberWithCommas(totalchampmastery)




                            url = "http://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json"
                            // request for ddragon to give me list of champions
                            getrequest(url, (error, data) => {
                                if (data.data != "error") {


                                    for (var i in data.data.data) {
                                        if (data.data.data.hasOwnProperty(i)) {
                                            if (bestchampid == data.data.data[i].key) {
                                                bestchamp = data.data.data[i].id
                                            }

                                        }
                                    }


                                    url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerid}?api_key=${key}`
                                    // get elo of 
                                    getrequest(url, (error, data) => {
                                        if (data.data != "error") {
                                            for (var i in data.data) {
                                                if (data.data[i].queueType == "RANKED_SOLO_5x5") {

                                                    rank = data.data[i].rank
                                                    tier = data.data[i].tier
                                                    ratio = Math.round((data.data[i].wins / (data.data[i].wins + data.data[i].losses)) * 100)

                                                }
                                            }





                                            url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountid}?api_key=${key}`

                                            getrequest(url, (error, data) => {
                                                if (data.data != "error") {
                                                    kills = 0
                                                    deaths = 0
                                                    assists = 0
                                                    cs = 0
                                                    vs = 0
                                                    totaldamage = 0
                                                    objdamage = 0
                                                    turretdamage = 0
                                                    turretkills = 0
                                                    inhibkills = 0
                                                    killingspree = 0
                                                    multikill = 0
                                                    allyjungle = 0
                                                    enemyjungle = 0
                                                    visionwards = 0
                                                    wardskilled = 0
                                                    dragonkills = 0
                                                    baronkills = 0
                                                    riftkills = 0
                                                    creepspermin10 = 0
                                                    creepspermin20 = 0
                                                    csdiff10 = 0
                                                    csdiff20 = 0
                                                    goldpermin10 = 0
                                                    goldpermin20 = 0
                                                    xppermin10 = 0
                                                    xppermin20 = 0
                                                    xpdiffpermin10 = 0
                                                    xpdiffpermin20 = 0


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

                                                        gameid = data.data.matches[i].gameId
                                                        url = `https://na1.api.riotgames.com/lol/match/v4/matches/${gameid}?api_key=${key}`

                                                        getrequest(url, (error, data) => {
                                                            if (data.data != "error") {
                                                                for (var i = 0; i < data.data.participantIdentities.length; i++) {
                                                                    if (summonername.toLowerCase() == data.data.participantIdentities[i].player.summonerName.toLowerCase()) {
                                                                        participantid = data.data.participantIdentities[i].participantId
                                                                    }
                                                                }

                                                                for (var i = 0; i < data.data.participants.length; i++) {
                                                                    if (participantid == data.data.participants[i].participantId) {

                                                                        teamid = data.data.participants[i].teamId

                                                                        if (teamid == 100) {
                                                                            dragonkills += parseInt(data.data.teams[0].dragonKills)
                                                                            baronkills += parseInt(data.data.teams[0].baronKills)
                                                                            riftkills += parseInt(data.data.teams[0].riftHeraldKills)

                                                                        }
                                                                        if (teamid == 200) {
                                                                            dragonkills += parseInt(data.data.teams[1].dragonKills)
                                                                            baronkills += parseInt(data.data.teams[1].baronKills)
                                                                            riftkills += parseInt(data.data.teams[1].riftHeraldKills)
                                                                        }


                                                                        totaldamage += parseInt(data.data.participants[i].stats.totalDamageDealtToChampions, 10)

                                                                        cs += parseInt(data.data.participants[i].stats.totalMinionsKilled, 10) + parseInt(data.data.participants[i].stats.neutralMinionsKilled, 10)

                                                                        vs += parseInt(data.data.participants[i].stats.visionScore, 10)
                                                                        kills += parseInt(data.data.participants[i].stats.kills, 10)
                                                                        deaths += parseInt(data.data.participants[i].stats.deaths, 10)
                                                                        assists += parseInt(data.data.participants[i].stats.assists, 10)
                                                                        objdamage += parseInt(data.data.participants[i].stats.damageDealtToObjectives, 10)
                                                                        turretdamage += parseInt(data.data.participants[i].stats.damageDealtToTurrets, 10)
                                                                        turretkills += parseInt(data.data.participants[i].stats.turretKills, 10)
                                                                        inhibkills += parseInt(data.data.participants[i].stats.inhibitorKills, 10)
                                                                        killingspree += parseInt(data.data.participants[i].stats.largestKillingSpree, 10)
                                                                        multikill += parseInt(data.data.participants[i].stats.largestMultiKill, 10)
                                                                        allyjungle += parseInt(data.data.participants[i].stats.neutralMinionsKilledTeamJungle, 10)
                                                                        enemyjungle += parseInt(data.data.participants[i].stats.neutralMinionsKilledEnemyJungle, 10)
                                                                        visionwards += parseInt(data.data.participants[i].stats.visionWardsBoughtInGame, 10)
                                                                        wardskilled += parseInt(data.data.participants[i].stats.wardsKilled, 10)

                                                                        if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas) != 'undefined') {
                                                                            if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas["0-10"]) != 'undefined') {
                                                                                creepspermin10 += parseInt(data.data.participants[i].timeline.creepsPerMinDeltas["0-10"], 10)

                                                                                cpm10count += 1
                                                                            }
                                                                        }

                                                                        if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas) != 'undefined') {
                                                                            if (typeof (data.data.participants[i].timeline.creepsPerMinDeltas["10-20"]) != 'undefined') {
                                                                                creepspermin20 += parseInt(data.data.participants[i].timeline.creepsPerMinDeltas["10-20"], 10)
                                                                                cpm20count += 1
                                                                            }
                                                                        }

                                                                        if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas) != 'undefined') {
                                                                            if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas["0-10"]) != 'undefined') {
                                                                                csdiff10 += parseInt(data.data.participants[i].timeline.csDiffPerMinDeltas["0-10"], 10)
                                                                                csd10count += 1
                                                                            }
                                                                        }
                                                                        if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas) != 'undefined') {
                                                                            if (typeof (data.data.participants[i].timeline.csDiffPerMinDeltas["10-20"]) != 'undefined') {
                                                                                csdiff20 += parseInt(data.data.participants[i].timeline.csDiffPerMinDeltas["10-20"], 10)
                                                                                csd20count += 1
                                                                            }
                                                                        }
                                                                        if (typeof (data.data.participants[i].timeline.goldPerMinDeltas) != 'undefined') {
                                                                            if (typeof (data.data.participants[i].timeline.goldPerMinDeltas["0-10"]) != 'undefined') {
                                                                                goldpermin10 += parseInt(data.data.participants[i].timeline.goldPerMinDeltas["0-10"], 10)
                                                                                gpm10count += 1
                                                                            }
                                                                        }
                                                                        if (typeof (data.data.participants[i].timeline.goldPerMinDeltas) != 'undefined') {
                                                                            if (typeof (data.data.participants[i].timeline.goldPerMinDeltas["10-20"]) != 'undefined') {
                                                                                goldpermin20 += parseInt(data.data.participants[i].timeline.goldPerMinDeltas["10-20"], 10)
                                                                                gpm20count += 1
                                                                            }
                                                                        }

                                                                        if (typeof (data.data.participants[i].timeline.xpPerMinDeltas) != 'undefined') {
                                                                            if (typeof (data.data.participants[i].timeline.xpPerMinDeltas["0-10"]) != 'undefined') {
                                                                                xppermin10 += parseInt(data.data.participants[i].timeline.xpPerMinDeltas["0-10"], 10)
                                                                                xpm10count += 1
                                                                            }
                                                                        }
                                                                        if (typeof (data.data.participants[i].timeline.xpPerMinDeltas) != 'undefined') {
                                                                            if (typeof (data.data.participants[i].timeline.xpPerMinDeltas["10-20"]) != 'undefined') {
                                                                                xppermin20 += parseInt(data.data.participants[i].timeline.xpPerMinDeltas["10-20"], 10)
                                                                                xpm20count += 1
                                                                            }
                                                                        }
                                                                        if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas) != 'undefined') {
                                                                            if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas["0-10"]) != 'undefined') {
                                                                                xpdiffpermin10 += parseInt(data.data.participants[i].timeline.xpDiffPerMinDeltas["0-10"], 10)
                                                                                xpd10count += 1
                                                                            }
                                                                        }
                                                                        if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas) != 'undefined') {
                                                                            if (typeof (data.data.participants[i].timeline.xpDiffPerMinDeltas["10-20"]) != 'undefined') {
                                                                                xpdiffpermin20 += parseInt(data.data.participants[i].timeline.xpDiffPerMinDeltas["10-20"], 10)
                                                                                xpd20count += 1
                                                                            }
                                                                        }


                                                                    }

                                                                }
                                                                counter += 1
                                                              

                                                                if (counter == 3) {

                                                                    totaldamage = Math.round(totaldamage / 3)

                                                                    cs = Math.round(cs / 3)
                                                                    vs = Math.round(vs / 3)
                                                                    kills = Math.round((kills / 3))
                                                                    deaths = Math.round(deaths / 3)
                                                                    assists = Math.round(assists / 3)
                                                                    objdamage = Math.round(objdamage / 3)
                                                                    turretdamage = Math.round(turretdamage / 3)
                                                                    turretkills = Math.round(turretkills / 3)
                                                                    inhibkills = Math.round(inhibkills / 3)
                                                                    killingspree = Math.round(killingspree / 3)
                                                                    multikill = Math.round(multikill / 3)
                                                                    allyjungle = Math.round(allyjungle / 3)
                                                                    enemyjungle = Math.round(enemyjungle / 3)
                                                                    visionwards = Math.round(visionwards / 3)
                                                                    wardskilled = Math.round(wardskilled / 3)
                                                                    creepspermin10 = Math.round(creepspermin10 / cpm10count)
                                                                    creepspermin20 = Math.round(creepspermin20 / cpm20count)
                                                                    csdiff10 = Math.round(csdiff10 / csd10count)
                                                                    csdiff20 = Math.round(csdiff20 / csd20count)
                                                                    goldpermin10 = Math.round(goldpermin10 / gpm10count)
                                                                    goldpermin20 = Math.round(goldpermin20 / gpm20count)
                                                                    xppermin10 = Math.round(xppermin10 / xpm10count)
                                                                    xppermin20 = Math.round(xppermin20 / xpm20count)
                                                                    xpdiffpermin10 = Math.round(xpdiffpermin10 / xpd10count)
                                                                    xpdiffpermin20 = Math.round(xpdiffpermin20 / xpd20count)
                                                                    dragonkills = Math.round(dragonkills / 3)
                                                                    baronkills = Math.round(baronkills / 3)
                                                                    riftkills = Math.round(riftkills / 3)







                                                                    var obj = {
                                                                        summonername: summonername,
                                                                        bestchampmastery: bestchampmastery,
                                                                        bestchamp: bestchamp,
                                                                        totalchampmastery: totalchampmastery,

                                                                        rank: rank,
                                                                        tier: tier,
                                                                        ratio: ratio,


                                                                        kills: kills,
                                                                        deaths: deaths,
                                                                        assists: assists,
                                                                        cs: cs,
                                                                        vs: vs,
                                                                        totaldamage: numberWithCommas(totaldamage),
                                                                        objdamage: objdamage,
                                                                        turretdamage: turretdamage,
                                                                        turretkills: turretkills,
                                                                        inhibkills: inhibkills,
                                                                        killingspree: killingspree,
                                                                        multikill: multikill,
                                                                        allyjungle: allyjungle,
                                                                        enemyjungle: enemyjungle,
                                                                        visionwards: visionwards,
                                                                        wardskilled: wardskilled,
                                                                        dragonkills: dragonkills,
                                                                        baronkills: baronkills,
                                                                        riftkills: riftkills,
                                                                        creepspermin10: creepspermin10,
                                                                        creepspermin20: creepspermin20,
                                                                        csdiff10: csdiff10,
                                                                        csdiff20: csdiff20,
                                                                        goldpermin10: goldpermin10,
                                                                        goldpermin20: goldpermin20,
                                                                        xppermin10: xppermin10,
                                                                        xppermin20: xppermin20,
                                                                        xpdiffpermin10: xpdiffpermin10,
                                                                        xpdiffpermin20: xpdiffpermin20,

                                                                    }







                                                                    resolve({data:obj})




                                                                }

                                                            }
                                                            else {
                                                                resolve({data:"error"})
                                                            }
                                                        })


                                                    }
                                                }
                                                else {
                                                    resolve({data:"error"})
                                                }
                                            })
                                        }
                                        else {
                                            resolve({data:"error"})
                                        }
                                    })
                                }
                                else {
                                    resolve({data:"error"})
                                }
                            })
                        }
                        else {
                            resolve({data:"error"})
                        }
                    })
                }
                else {
                    resolve({data:"error"})
                }
            })

        })


    }

}


