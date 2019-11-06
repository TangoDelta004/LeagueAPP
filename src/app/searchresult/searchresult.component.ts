import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { ParseSourceSpan } from '@angular/compiler';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { FunctionsService } from "../functions.service";


@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {


  winner = ''
  summonername = ''
  resultsobtained = false
  summonwins = false
  opponentwins = false


  summonpwnertier = ""
  summonpwnerrank = ""
  opponenttier = ""
  opprank = ""

  oppbestchamp = ""
  oppbestchampmastery = ""
  opptotalmastery = ""
  SPbestchamp = ""
  SPbestchampmastery = ""
  SPtotalmastery = ""

  oppiron = false
  oppbronze = false
  oppsilver = false
  oppgold = false
  oppplat = false
  oppdiamond = false
  oppmaster = false
  oppgrandmaster = false
  oppchallenger = false
  oppunranked = false
  iron = false
  bronze = false
  silver = false
  gold = false
  plat = false
  diamond = false
  master = false
  grandmaster = false
  challenger = false
  unranked = false

  oppratio = 0
  SPratio = 0

  oppkills = 0
  oppdeaths = 0
  oppassists = 0
  oppcs = 0
  oppvs = 0
  opptotaldamage = 0
  oppobjdamage = 0
  oppturretdamage = 0
  oppturretkills = 0
  oppinhibkills = 0
  oppkillingspree = 0
  oppmultikill = 0
  oppallyjungle = 0
  oppenemyjungle = 0
  oppvisionwards = 0
  oppwardskilled = 0
  oppcreepspermin10 = 0
  oppcreepspermin20 = 0
  oppcsdiff10 = 0
  oppcsdiff20 = 0
  oppgoldpermin10 = 0
  oppgoldpermin20 = 0
  oppxppermin10 = 0
  oppxppermin20 = 0
  oppxpdiffpermin10 = 0
  oppxpdiffpermin20 = 0
  oppbaronkills = 0
  oppdragonkills = 0
  oppriftkills = 0






  SPkills = 0
  SPdeaths = 0
  SPassists = 0
  SPcs = 0
  SPvs = 0
  SPtotaldamage = 0
  SPobjdamage = 0
  SPturretdamage = 0
  SPturretkills = 0
  SPinhibkills = 0
  SPkillingspree = 0
  SPmultikill = 0
  SPallyjungle = 0
  SPenemyjungle = 0
  SPvisionwards = 0
  SPwardskilled = 0
  SPcreepspermin10 = 0
  SPcreepspermin20 = 0
  SPcsdiff10 = 0
  SPcsdiff20 = 0
  SPgoldpermin10 = 0
  SPgoldpermin20 = 0
  SPxppermin10 = 0
  SPxppermin20 = 0
  SPxpdiffpermin10 = 0
  SPxpdiffpermin20 = 0
  SPbaronkills = 0
  SPdragonkills = 0
  SPriftkills = 0

  key = 'RGAPI-1b82014d-0e71-4b0a-8025-11a315cd35b8'

  counter = 0
  counter2 = 0
  dataobj;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private functions: FunctionsService) { }


  details() {
    var data = {
      kills: this.oppkills
    }

    this.router.navigate(['/searchresult', data])
  }



  ngOnInit() {


    this.functions.currentMessage.subscribe(dataobj => this.dataobj = dataobj)
    console.log(this.dataobj)

    if (this.dataobj.P1tier == "DIAMOND"){
      console.log("REEEEEEEE")
      this.diamond = true
    }
    // this.oppiron = this.dataobj.
    // this.oppbronze = this.dataobj
    // this.oppsilver = this.dataobj
    // this.oppgold = this.dataobj
    // this.oppplat = this.dataobj
    // this.oppdiamond = this.dataobj
    // this.oppmaster = this.dataobj
    // this.oppgrandmaster = this.dataobj
    // this.oppchallenger = this.dataobj
    // this.oppunranked = this.dataobj
    // this.iron = this.dataobj
    // this.bronze = this.dataobj
    // this.silver = this.dataobj
    // this.gold = this.dataobj
    // this.plat = this.dataobj
    // this.diamond = this.dataobj
    // this.master = this.dataobj
    // this.grandmaster = this.dataobj
    // this.challenger = this.dataobj
    // this.unranked = this.dataobj

    // function numberWithCommas(x) {
    //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }




    // this gets the summoner name from the URL so be used
    // console.log(this.route.snapshot.params)
    // this.route.params.pipe(map(responseData => {
    //   const array = []
    //   for (const key in responseData) {
    //     array.push(responseData[key])
    //   }
    //   return array
    // })).subscribe((response) => {
    //   console.log(response)
    // })

    // var cpm10count = 0
    // var cpm20count = 0
    // var csd10count = 0
    // var csd20count = 0
    // var xpd10count = 0
    // var xpd20count = 0
    // var xpm10count = 0
    // var xpm20count = 0
    // var gpm10count = 0
    // var gpm20count = 0

    // var cpm10count2 = 0
    // var cpm20count2 = 0
    // var csd10count2 = 0
    // var csd20count2 = 0
    // var xpd10count2 = 0
    // var xpd20count2 = 0
    // var xpm10count2 = 0
    // var xpm20count2 = 0
    // var gpm10count2 = 0
    // var gpm20count2 = 0

    // this.resultsobtained = false
    // this.summonwins = false
    // this.opponentwins = false
    // var summonerId = ''
    // var accountId = ''
    // var summonpwneraccountId = ''
    // var summonpwnerId = ''
    // var winner = ''

    // // this gets the summoners ID from his summonername
    // const request = this.http.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.summonername}?api_key=${this.key}`)
    // console.log(this.summonername)
    // request.pipe(map(responseData => {
    //   const array = []
    //   for (const key in responseData) {
    //     array.push(responseData[key])
    //   }
    //   return array
    // })).subscribe((response) => {
    //   console.log(response)
    //   summonerId = response[0]
    //   accountId = response[1]

    //   //this gets the list of champions in order of mastery for that summoner ID
    //   const masteryrequest = this.http.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${this.key}`)
    //   masteryrequest.pipe(map(responseData => {
    //     const array = []
    //     for (const key in responseData) {
    //       array.push(responseData[key])
    //     }
    //     return array
    //   })).subscribe((response) => {
    //     console.log(response)
    //     this.oppbestchamp = response[0].championId
    //     this.oppbestchampmastery = response[0].championPoints
    //     var oppnummastery = 0
    //     for (var i in response) {
    //       oppnummastery += parseInt(response[i].championPoints, 10)

    //     }
    //     this.opptotalmastery = oppnummastery.toString()

    //     this.opptotalmastery = numberWithCommas(this.opptotalmastery)
    //     //this gets summonpwners ID
    //     const request = this.http.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Summonpwner?api_key=${this.key}`)

    //     request.pipe(map(responseData => {
    //       const array = []
    //       for (const key in responseData) {
    //         array.push(responseData[key])
    //       }
    //       return array
    //     })).subscribe((response) => {
    //       console.log(response)
    //       summonpwnerId = response[0]
    //       summonpwneraccountId = response[1]

    //       //this gets Summonpwners champion mastery list
    //       const masteryrequest = this.http.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonpwnerId}?api_key=${this.key}`)
    //       masteryrequest.pipe(map(responseData => {
    //         const array = []
    //         for (const key in responseData) {
    //           array.push(responseData[key])
    //         }
    //         return array
    //       })).subscribe((response) => {
    //         console.log(response)
    //         this.SPbestchamp = response[0].championId
    //         this.SPbestchampmastery = response[0].championPoints
    //         var SPnummastery = 0
    //         for (var i in response) {
    //           SPnummastery += parseInt(response[i].championPoints, 10)

    //         }
    //         this.SPtotalmastery = SPnummastery.toString()
    //         this.SPtotalmastery = numberWithCommas(this.SPtotalmastery)

    //         //this gets the list of champions so I can match the champion ID to its name
    //         const ddragon = this.http.get("http://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json")
    //         ddragon.pipe(map(responseData => {
    //           const array = []
    //           for (const key in responseData) {
    //             array.push(responseData[key])
    //           }
    //           return array
    //         })).subscribe((response) => {
    //           console.log(response)
    //           const list = []
    //           var champlist = response[3]
    //           for (const champ in champlist) {
    //             list.push(champlist[champ])
    //           }
    //           for (const index in list) {
    //             if (list[index].key == this.oppbestchamp) {

    //               console.log(list[index].id)
    //               this.oppbestchamp = list[index].id
    //             }
    //             if (list[index].key == this.SPbestchamp) {

    //               console.log(list[index].id)
    //               this.SPbestchamp = list[index].id
    //             }
    //           }

    //           this.SPbestchampmastery = numberWithCommas(this.SPbestchampmastery)
    //           this.oppbestchampmastery = numberWithCommas(this.oppbestchampmastery)

    //           console.log(summonerId)
    //           const elorequest = this.http.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${this.key}`)
    //           elorequest.pipe(map(responseData => {
    //             const array = []
    //             for (const key in responseData) {
    //               array.push(responseData[key])
    //             }
    //             return array
    //           })).subscribe((response) => {




    //             for (var i in response) {

    //               if (response[i].queueType == "RANKED_SOLO_5x5") {

    //                 this.opponenttier = response[i].tier

    //                 if (this.opponenttier != "CHALLENGER") {
    //                   this.opprank = response[i].rank
    //                 }

    //                 this.oppratio = Math.round((response[i].wins / (response[i].wins + response[i].losses)) * 100)

    //                 console.log(response)
    //               }
    //             }
    //             switch (this.opponenttier) {
    //               case "IRON": {
    //                 this.oppiron = true
    //                 break;
    //               }
    //               case "BRONZE": {
    //                 this.oppbronze = true
    //                 break;
    //               }
    //               case "SILVER": {
    //                 this.oppsilver = true
    //                 break;
    //               }
    //               case "GOLD": {
    //                 this.oppgold = true
    //                 break;
    //               }
    //               case "PLATINUM": {
    //                 this.oppplat = true
    //                 break;
    //               }
    //               case "DIAMOND": {
    //                 this.oppdiamond = true
    //                 break;
    //               }
    //               case "MASTER": {
    //                 this.oppmaster = true
    //                 break;
    //               }
    //               case "GRANDMASTER": {
    //                 this.oppgrandmaster = true
    //                 break;
    //               }
    //               case "CHALLENGER": {
    //                 this.oppchallenger = true
    //                 break;
    //               }
    //               default: {
    //                 this.oppunranked = true
    //                 break;
    //               }
    //             }


    //             const summonpwnerelo = this.http.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonpwnerId}?api_key=${this.key}`)
    //             summonpwnerelo.pipe(map(responseData => {
    //               const array = []
    //               for (const key in responseData) {
    //                 array.push(responseData[key])
    //               }
    //               return array
    //             })).subscribe((response) => {

    //               for (var i in response) {

    //                 if (response[i].queueType == "RANKED_SOLO_5x5") {

    //                   this.summonpwnertier = response[i].tier
    //                   this.summonpwnerrank = response[i].rank

    //                   this.SPratio = Math.round((response[i].wins / (response[i].wins + response[i].losses)) * 100)
    //                   console.log(response)
    //                 }
    //               }
    //               switch (this.summonpwnertier) {
    //                 case "IRON": {
    //                   this.iron = true
    //                   break;
    //                 }
    //                 case "BRONZE": {
    //                   this.bronze = true
    //                   break;
    //                 }
    //                 case "SILVER": {
    //                   this.silver = true
    //                   break;
    //                 }
    //                 case "GOLD": {
    //                   this.gold = true
    //                   break;
    //                 }
    //                 case "PLATINUM": {
    //                   this.plat = true
    //                   break;
    //                 }
    //                 case "DIAMOND": {
    //                   this.diamond = true
    //                   break;
    //                 }
    //                 case "MASTER": {
    //                   this.master = true
    //                   break;
    //                 }
    //                 case "GRANDMASTER": {
    //                   this.grandmaster = true
    //                   break;
    //                 }
    //                 case "CHALLENGER": {
    //                   this.challenger = true
    //                   break;
    //                 }
    //                 default: {
    //                   this.unranked = true
    //                   break;
    //                 }
    //               }






    //               const matches = this.http.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${this.key}`)

    //               matches.pipe(map(responseData => {
    //                 const array = []
    //                 console.log('---------------')

    //                 for (const key in responseData) {

    //                   if (key == "matches") {
    //                     array.push(responseData[key])
    //                   }
    //                 }
    //                 return array
    //               })).subscribe((response) => {
    //                 console.log(response)


    //                 console.log(".")



    //                 for (var k = 0; k < 5; k++) {


    //                   var gameid = response[0][k].gameId


    //                   const game = this.http.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${gameid}?api_key=${this.key}`)
    //                   game.pipe(map(responseData => {
    //                     const array = []
    //                     console.log('000000000000000000000000000000000000000')
    //                     console.log(responseData)
    //                     for (const key in responseData) {

    //                       array.push(responseData[key])

    //                     }
    //                     return array
    //                   })).subscribe((response) => {
    //                     console.log(response)
    //                     var teamid = 0
    //                     for (i in response[12]) {
    //                       console.log('.........................')
    //                       console.log(response[12][i].player.summonerName)

    //                       if (response[12][i].player.summonerName.toLowerCase() == this.summonername.toLowerCase()) {
    //                         var oppparticipantid = response[12][i].participantId
    //                         console.log(oppparticipantid)
    //                         for (var j in response[11]) {
    //                           if (response[11][j].participantId == oppparticipantid) {
    //                             console.log(j)
    //                             teamid = response[11][j].teamId
    //                             console.log(teamid)
    //                             if (teamid==100){
    //                               this.oppdragonkills+=parseInt(response[10][0].dragonKills)
    //                               this.oppbaronkills+=parseInt(response[10][0].baronKills)
    //                               this.oppriftkills+=parseInt(response[10][0].riftHeraldKills)

    //                             }
    //                             if (teamid==200){
    //                               this.oppdragonkills+=parseInt(response[10][1].dragonKills)
    //                               this.oppbaronkills+=parseInt(response[10][1].baronKills)
    //                               this.oppriftkills+=parseInt(response[10][1].riftHeraldKills)
    //                             }


    //                             this.opptotaldamage += parseInt(response[11][j].stats.totalDamageDealtToChampions, 10)
    //                             this.oppcs += parseInt(response[11][j].stats.totalMinionsKilled, 10) + parseInt(response[11][i].stats.neutralMinionsKilled, 10)
    //                             this.oppvs += parseInt(response[11][j].stats.visionScore, 10)
    //                             this.oppkills += parseInt(response[11][j].stats.kills, 10)
    //                             this.oppdeaths += parseInt(response[11][j].stats.deaths, 10)
    //                             this.oppassists += parseInt(response[11][j].stats.assists, 10)

    //                             this.oppobjdamage += parseInt(response[11][j].stats.damageDealtToObjectives, 10)
    //                             this.oppturretdamage += parseInt(response[11][j].stats.damageDealtToTurrets, 10)
    //                             this.oppturretkills += parseInt(response[11][j].stats.turretKills, 10)
    //                             this.oppinhibkills += parseInt(response[11][j].stats.inhibitorKills, 10)
    //                             this.oppkillingspree += parseInt(response[11][j].stats.largestKillingSpree, 10)
    //                             this.oppmultikill += parseInt(response[11][j].stats.largestMultiKill, 10)
    //                             this.oppallyjungle += parseInt(response[11][j].stats.neutralMinionsKilledTeamJungle, 10)
    //                             this.oppenemyjungle += parseInt(response[11][j].stats.neutralMinionsKilledEnemyJungle, 10)
    //                             this.oppvisionwards += parseInt(response[11][j].stats.visionWardsBoughtInGame, 10)
    //                             this.oppwardskilled += parseInt(response[11][j].stats.wardsKilled, 10)

    //                             if (typeof (response[11][j].timeline.creepsPerMinDeltas) != 'undefined') {
    //                               if (typeof (response[11][j].timeline.creepsPerMinDeltas["0-10"]) != 'undefined') {
    //                                 this.oppcreepspermin10 += parseInt(response[11][j].timeline.creepsPerMinDeltas["0-10"], 10)

    //                                 cpm10count += 1
    //                               }
    //                             }

    //                             if (typeof (response[11][j].timeline.creepsPerMinDeltas) != 'undefined') {
    //                               if (typeof (response[11][j].timeline.creepsPerMinDeltas["10-20"]) != 'undefined') {
    //                                 this.oppcreepspermin20 += parseInt(response[11][j].timeline.creepsPerMinDeltas["10-20"], 10)
    //                                 cpm20count += 1
    //                               }
    //                             }

    //                             if (typeof (response[11][j].timeline.csDiffPerMinDeltas) != 'undefined') {
    //                               if (typeof (response[11][j].timeline.csDiffPerMinDeltas["0-10"]) != 'undefined') {
    //                                 this.oppcsdiff10 += parseInt(response[11][j].timeline.csDiffPerMinDeltas["0-10"], 10)
    //                                 csd10count += 1
    //                               }
    //                             }
    //                             if (typeof (response[11][j].timeline.csDiffPerMinDeltas) != 'undefined') {
    //                               if (typeof (response[11][j].timeline.csDiffPerMinDeltas["10-20"]) != 'undefined') {
    //                                 this.oppcsdiff20 += parseInt(response[11][j].timeline.csDiffPerMinDeltas["10-20"], 10)
    //                                 csd20count += 1
    //                               }
    //                             }
    //                             if (typeof (response[11][j].timeline.goldPerMinDeltas) != 'undefined') {
    //                               if (typeof (response[11][j].timeline.goldPerMinDeltas["0-10"]) != 'undefined') {
    //                                 this.oppgoldpermin10 += parseInt(response[11][j].timeline.goldPerMinDeltas["0-10"], 10)
    //                                 gpm10count += 1
    //                               }
    //                             }
    //                             if (typeof (response[11][j].timeline.goldPerMinDeltas) != 'undefined') {
    //                               if (typeof (response[11][j].timeline.goldPerMinDeltas["10-20"]) != 'undefined') {
    //                                 this.oppgoldpermin20 += parseInt(response[11][j].timeline.goldPerMinDeltas["10-20"], 10)
    //                                 gpm20count += 1
    //                               }
    //                             }

    //                             if (typeof (response[11][j].timeline.xpPerMinDeltas) != 'undefined') {
    //                               if (typeof (response[11][j].timeline.xpPerMinDeltas["0-10"]) != 'undefined') {
    //                                 this.oppxppermin10 += parseInt(response[11][j].timeline.xpPerMinDeltas["0-10"], 10)
    //                                 xpm10count += 1
    //                               }
    //                             }
    //                             if (typeof (response[11][j].timeline.xpPerMinDeltas) != 'undefined') {
    //                               if (typeof (response[11][j].timeline.xpPerMinDeltas["10-20"]) != 'undefined') {
    //                                 this.oppxppermin20 += parseInt(response[11][j].timeline.xpPerMinDeltas["10-20"], 10)
    //                                 xpm20count += 1
    //                               }
    //                             }
    //                             if (typeof (response[11][j].timeline.xpDiffPerMinDeltas) != 'undefined') {
    //                               if (typeof (response[11][j].timeline.xpDiffPerMinDeltas["0-10"]) != 'undefined') {
    //                                 this.oppxpdiffpermin10 += parseInt(response[11][j].timeline.xpDiffPerMinDeltas["0-10"], 10)
    //                                 xpd10count += 1
    //                               }
    //                             }
    //                             if (typeof (response[11][j].timeline.xpDiffPerMinDeltas) != 'undefined') {
    //                               if (typeof (response[11][j].timeline.xpDiffPerMinDeltas["10-20"]) != 'undefined') {
    //                                 this.oppxpdiffpermin20 += parseInt(response[11][j].timeline.xpDiffPerMinDeltas["10-20"], 10)
    //                                 xpd20count += 1
    //                               }
    //                             }
    //                             this.counter += 1
    //                           }
    //                         }


    //                       }


    //                     }
    //                     console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    //                     console.log(this.counter)
    //                     console.log(cpm20count)
    //                     if (this.counter == 5) {
    //                       this.opptotaldamage = Math.round(this.opptotaldamage / 5)
    //                       this.oppcs = Math.round(this.oppcs / 5)
    //                       this.oppvs = Math.round(this.oppvs / 5)
    //                       this.oppkills = Math.round((this.oppkills / 5))
    //                       this.oppdeaths = Math.round(this.oppdeaths / 5)
    //                       this.oppassists = Math.round(this.oppassists / 5)
    //                       this.oppobjdamage = Math.round(this.oppobjdamage / 5)
    //                       this.oppturretdamage = Math.round(this.oppturretdamage / 5)
    //                       this.oppturretkills = Math.round(this.oppturretkills / 5)
    //                       this.oppinhibkills = Math.round(this.oppinhibkills / 5)
    //                       this.oppkillingspree = Math.round(this.oppkillingspree / 5)
    //                       this.oppmultikill = Math.round(this.oppmultikill / 5)
    //                       this.oppallyjungle = Math.round(this.oppallyjungle / 5)
    //                       this.oppenemyjungle = Math.round(this.oppenemyjungle / 5)
    //                       this.oppvisionwards = Math.round(this.oppvisionwards / 5)
    //                       this.oppwardskilled = Math.round(this.oppwardskilled / 5)
    //                       this.oppcreepspermin10 = Math.round(this.oppcreepspermin10 / cpm10count)
    //                       this.oppcreepspermin20 = Math.round(this.oppcreepspermin20 / cpm20count)
    //                       this.oppcsdiff10 = Math.round(this.oppcsdiff10 / csd10count)
    //                       this.oppcsdiff20 = Math.round(this.oppcsdiff20 / csd20count)
    //                       this.oppgoldpermin10 = Math.round(this.oppgoldpermin10 / gpm10count)
    //                       this.oppgoldpermin20 = Math.round(this.oppgoldpermin20 / gpm20count)
    //                       this.oppxppermin10 = Math.round(this.oppxppermin10 / xpm10count)
    //                       this.oppxppermin20 = Math.round(this.oppxppermin20 / xpm20count)
    //                       this.oppxpdiffpermin10 = Math.round(this.oppxpdiffpermin10 / xpd10count)
    //                       this.oppxpdiffpermin20 = Math.round(this.oppxpdiffpermin20 / xpd20count)
    //                       this.oppdragonkills =  Math.round(this.oppdragonkills / 5)
    //                       this.oppbaronkills =  Math.round(this.oppbaronkills / 5)
    //                       this.oppriftkills =  Math.round(this.oppriftkills / 5)
    //                     }
    //                   })

    //                 }


    //                 const SPmatches = this.http.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonpwneraccountId}?api_key=${this.key}`)

    //                 SPmatches.pipe(map(responseData => {
    //                   const array = []
    //                   console.log('---------------')

    //                   for (const key in responseData) {

    //                     if (key == "matches") {
    //                       array.push(responseData[key])
    //                     }
    //                   }
    //                   return array
    //                 })).subscribe((response) => {
    //                   console.log(response)


    //                   console.log(".")


    //                   for (var k = 0; k < 5; k++) {

    //                     var gameid = response[0][k].gameId


    //                     const SPgame = this.http.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${gameid}?api_key=${this.key}`)
    //                     SPgame.pipe(map(responseData => {
    //                       const array = []
    //                       console.log('00000000000000000000000000000000000000000')
    //                       console.log(responseData)
    //                       for (const key in responseData) {

    //                         array.push(responseData[key])

    //                       }
    //                       return array
    //                     })).subscribe((response) => {
    //                       console.log(response)
    //                       var SPteamid=0
    //                       for (i in response[12]) {
    //                         console.log('.........................')
    //                         console.log(response[12][i].player.summonerName)

    //                         var name = "summonpwner"
    //                         if (response[12][i].player.summonerName.toLowerCase() == name.toLowerCase()) {
    //                           var SPparticipantid = response[12][i].participantId
    //                           console.log(SPparticipantid)
    //                           for (var j in response[11]) {
    //                             if (response[11][j].participantId == SPparticipantid) {
    //                               console.log(j)
    //                               SPteamid = response[11][j].teamId
    //                               console.log(SPteamid)
    //                               if (SPteamid==100){
    //                                 this.SPdragonkills+=parseInt(response[10][0].dragonKills)
    //                                 this.SPbaronkills+=parseInt(response[10][0].baronKills)
    //                                 this.SPriftkills+=parseInt(response[10][0].riftHeraldKills)

    //                               }
    //                               if (SPteamid==200){
    //                                 this.SPdragonkills+=parseInt(response[10][1].dragonKills)
    //                                 this.SPbaronkills+=parseInt(response[10][1].baronKills)
    //                                 this.SPriftkills+=parseInt(response[10][1].riftHeraldKills)
    //                               }

    //                               this.SPtotaldamage += parseInt(response[11][j].stats.totalDamageDealtToChampions, 10)
    //                               this.SPcs += parseInt(response[11][j].stats.totalMinionsKilled, 10) + parseInt(response[11][i].stats.neutralMinionsKilled, 10)
    //                               this.SPvs += parseInt(response[11][j].stats.visionScore, 10)
    //                               this.SPkills += parseInt(response[11][j].stats.kills, 10)
    //                               this.SPdeaths += parseInt(response[11][j].stats.deaths, 10)
    //                               this.SPassists += parseInt(response[11][j].stats.assists, 10)
    //                               this.SPobjdamage += parseInt(response[11][j].stats.damageDealtToObjectives, 10)
    //                               this.SPturretdamage += parseInt(response[11][j].stats.damageDealtToTurrets, 10)
    //                               this.SPturretkills += parseInt(response[11][j].stats.turretKills, 10)
    //                               this.SPinhibkills += parseInt(response[11][j].stats.inhibitorKills, 10)
    //                               this.SPkillingspree += parseInt(response[11][j].stats.largestKillingSpree, 10)
    //                               this.SPmultikill += parseInt(response[11][j].stats.largestMultiKill, 10)
    //                               this.SPallyjungle += parseInt(response[11][j].stats.neutralMinionsKilledTeamJungle, 10)
    //                               this.SPenemyjungle += parseInt(response[11][j].stats.neutralMinionsKilledEnemyJungle, 10)
    //                               this.SPvisionwards += parseInt(response[11][j].stats.visionWardsBoughtInGame, 10)
    //                               this.SPwardskilled += parseInt(response[11][j].stats.wardsKilled, 10)
    //                               if (typeof (response[11][j].timeline.creepsPerMinDeltas) != 'undefined') {
    //                                 if (typeof (response[11][j].timeline.creepsPerMinDeltas["0-10"]) != 'undefined') {
    //                                   this.SPcreepspermin10 += parseInt(response[11][j].timeline.creepsPerMinDeltas["0-10"], 10)

    //                                   cpm10count2 += 1
    //                                 }

    //                               }
    //                               if (typeof (response[11][j].timeline.creepsPerMinDeltas) != 'undefined') {
    //                                 if (typeof (response[11][j].timeline.creepsPerMinDeltas["10-20"]) != 'undefined') {
    //                                   this.SPcreepspermin20 += parseInt(response[11][j].timeline.creepsPerMinDeltas["10-20"], 10)
    //                                   cpm20count2 += 1
    //                                 }
    //                               }
    //                               if (typeof (response[11][j].timeline.csDiffPerMinDeltas) != 'undefined') {

    //                                 if (typeof (response[11][j].timeline.csDiffPerMinDeltas["0-10"]) != 'undefined') {
    //                                   this.SPcsdiff10 += parseInt(response[11][j].timeline.csDiffPerMinDeltas["0-10"], 10)
    //                                   csd10count2 += 1
    //                                 }
    //                               }
    //                               if (typeof (response[11][j].timeline.csDiffPerMinDeltas) != 'undefined') {
    //                                 if (typeof (response[11][j].timeline.csDiffPerMinDeltas["10-20"]) != 'undefined') {
    //                                   this.SPcsdiff20 += parseInt(response[11][j].timeline.csDiffPerMinDeltas["10-20"], 10)
    //                                   csd20count2 += 1
    //                                 }
    //                               }
    //                               if (typeof (response[11][j].timeline.goldPerMinDeltas) != 'undefined') {
    //                                 if (typeof (response[11][j].timeline.goldPerMinDeltas["0-10"]) != 'undefined') {
    //                                   this.SPgoldpermin10 += parseInt(response[11][j].timeline.goldPerMinDeltas["0-10"], 10)
    //                                   gpm10count2 += 1
    //                                 }
    //                               }
    //                               if (typeof (response[11][j].timeline.goldPerMinDeltas) != 'undefined') {
    //                                 if (typeof (response[11][j].timeline.goldPerMinDeltas["10-20"]) != 'undefined') {
    //                                   this.SPgoldpermin20 += parseInt(response[11][j].timeline.goldPerMinDeltas["10-20"], 10)
    //                                   gpm20count2 += 1
    //                                 }
    //                               }
    //                               if (typeof (response[11][j].timeline.xpPerMinDeltas) != 'undefined') {
    //                                 if (typeof (response[11][j].timeline.xpPerMinDeltas["0-10"]) != 'undefined') {
    //                                   this.SPxppermin10 += parseInt(response[11][j].timeline.xpPerMinDeltas["0-10"], 10)
    //                                   xpm10count2 += 1
    //                                 }
    //                               }
    //                               if (typeof (response[11][j].timeline.xpPerMinDeltas) != 'undefined') {
    //                                 if (typeof (response[11][j].timeline.xpPerMinDeltas["10-20"]) != 'undefined') {
    //                                   this.SPxppermin20 += parseInt(response[11][j].timeline.xpPerMinDeltas["10-20"], 10)
    //                                   xpm20count2 += 1
    //                                 }
    //                               }
    //                               if (typeof (response[11][j].timeline.xpDiffPerMinDeltas) != 'undefined') {
    //                                 if (typeof (response[11][j].timeline.xpDiffPerMinDeltas["0-10"]) != 'undefined') {
    //                                   this.SPxpdiffpermin10 += parseInt(response[11][j].timeline.xpDiffPerMinDeltas["0-10"], 10)
    //                                   xpd10count2 += 1
    //                                 }
    //                               }
    //                               if (typeof (response[11][j].timeline.xpDiffPerMinDeltas) != 'undefined') {
    //                                 if (typeof (response[11][j].timeline.xpDiffPerMinDeltas["10-20"]) != 'undefined') {
    //                                   this.SPxpdiffpermin20 += parseInt(response[11][j].timeline.xpDiffPerMinDeltas["10-20"], 10)
    //                                   xpd20count2 += 1
    //                                 }
    //                               }

    //                               this.counter2 += 1
    //                             }
    //                           }


    //                         }


    //                       }
    //                       console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    //                       console.log(this.counter2)
    //                       if (this.counter2 == 5) {
    //                         this.SPtotaldamage = Math.round(this.SPtotaldamage / 5)
    //                         this.SPcs = Math.round(this.SPcs / 5)
    //                         this.SPvs = Math.round(this.SPvs / 5)
    //                         this.SPkills = Math.round((this.SPkills / 5))
    //                         this.SPdeaths = Math.round(this.SPdeaths / 5)
    //                         this.SPassists = Math.round(this.SPassists / 5)
    //                         this.SPobjdamage = Math.round(this.SPobjdamage / 5)
    //                         this.SPturretdamage = Math.round(this.SPturretdamage / 5)
    //                         this.SPturretkills = Math.round(this.SPturretkills / 5)
    //                         this.SPinhibkills = Math.round(this.SPinhibkills / 5)
    //                         this.SPkillingspree = Math.round(this.SPkillingspree / 5)
    //                         this.SPmultikill = Math.round(this.SPmultikill / 5)
    //                         this.SPallyjungle = Math.round(this.SPallyjungle / 5)
    //                         this.SPenemyjungle = Math.round(this.SPenemyjungle / 5)
    //                         this.SPvisionwards = Math.round(this.SPvisionwards / 5)
    //                         this.SPwardskilled = Math.round(this.SPwardskilled / 5)

    //                         this.SPcreepspermin10 = Math.round(this.SPcreepspermin10 / cpm10count2)
    //                         this.SPcreepspermin20 = Math.round(this.SPcreepspermin20 / cpm20count2)
    //                         this.SPcsdiff10 = Math.round(this.SPcsdiff10 / csd10count2)
    //                         this.SPcsdiff20 = Math.round(this.SPcsdiff20 / csd20count2)
    //                         this.SPgoldpermin10 = Math.round(this.SPgoldpermin10 / gpm10count2)
    //                         this.SPgoldpermin20 = Math.round(this.SPgoldpermin20 / gpm20count2)
    //                         this.SPxppermin10 = Math.round(this.SPxppermin10 / xpm10count2)
    //                         this.SPxppermin20 = Math.round(this.SPxppermin20 / xpm20count2)
    //                         this.SPxpdiffpermin10 = Math.round(this.SPxpdiffpermin10 / xpd10count2)
    //                         this.SPxpdiffpermin20 = Math.round(this.SPxpdiffpermin20 / xpd20count2)
    //                         this.SPdragonkills =  Math.round(this.SPdragonkills / 5)
    //                         this.SPbaronkills =  Math.round(this.SPbaronkills / 5)
    //                         this.SPriftkills =  Math.round(this.SPriftkills / 5)
    //                       }
    //                     })

    //                   }
    //                 })


    //               })




    //             })
    //           })






































    //         })

    //       })

    //     })


    //   })

    // })




  }

}
