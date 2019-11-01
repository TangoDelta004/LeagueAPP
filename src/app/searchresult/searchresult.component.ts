import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'


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
  ratio = 0

  oppkills = ''
  oppdeaths = ''
  oppassists = ''
  oppcs = ''
  oppvs = ''
  opptotaldamage = ''
  imageToShow = ''

  key = 'RGAPI-6ae53a53-f886-4383-b608-2da86b23e6ac'

  counter = 0


  constructor(private route: ActivatedRoute, private http: HttpClient) { }





  ngOnInit() {

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function createImageFromBlob(image) {

      let reader = new FileReader();
      reader.addEventListener("load", () => {
        //console.log(reader.result) 
        this.imageToShow = reader.result;
      }, false);

      if (image) {
        reader.readAsDataURL(image);
      }
    }

    // this gets the summoner name from the URL so be used
    console.log(this.route.snapshot.params)
    this.route.params.pipe(map(responseData => {
      const array = []
      for (const key in responseData) {
        array.push(responseData[key])
      }
      return array
    })).subscribe((response) => {
      this.summonername = response[0]
    })


    this.resultsobtained = false
    this.summonwins = false
    this.opponentwins = false
    var summonerId = ''
    var accountId = ''
    var summonpwneraccountId = ''
    var summonpwnerId = ''
    var winner = ''

    // this gets the summoners ID from his summonername
    const request = this.http.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.summonername}?api_key=${this.key}`)
    console.log(this.summonername)
    request.pipe(map(responseData => {
      const array = []
      for (const key in responseData) {
        array.push(responseData[key])
      }
      return array
    })).subscribe((response) => {
      console.log(response)
      summonerId = response[0]
      accountId = response[1]

      //this gets the list of champions in order of mastery for that summoner ID
      const masteryrequest = this.http.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${this.key}`)
      masteryrequest.pipe(map(responseData => {
        const array = []
        for (const key in responseData) {
          array.push(responseData[key])
        }
        return array
      })).subscribe((response) => {
        console.log(response)
        this.oppbestchamp = response[0].championId
        this.oppbestchampmastery = response[0].championPoints
        var oppnummastery = 0
        for (var i in response) {
          oppnummastery += parseInt(response[i].championPoints, 10)

        }
        this.opptotalmastery = oppnummastery.toString()

        this.opptotalmastery = numberWithCommas(this.opptotalmastery)
        //this gets summonpwners ID
        const request = this.http.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Summonpwner?api_key=${this.key}`)

        request.pipe(map(responseData => {
          const array = []
          for (const key in responseData) {
            array.push(responseData[key])
          }
          return array
        })).subscribe((response) => {
          console.log(response)
          summonpwnerId = response[0]

          //this gets Summonpwners champion mastery list
          const masteryrequest = this.http.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonpwnerId}?api_key=${this.key}`)
          masteryrequest.pipe(map(responseData => {
            const array = []
            for (const key in responseData) {
              array.push(responseData[key])
            }
            return array
          })).subscribe((response) => {
            console.log(response)
            this.SPbestchamp = response[0].championId
            this.SPbestchampmastery = response[0].championPoints
            var SPnummastery = 0
            for (var i in response) {
              SPnummastery += parseInt(response[i].championPoints, 10)

            }
            this.SPtotalmastery = SPnummastery.toString()
            this.SPtotalmastery = numberWithCommas(this.SPtotalmastery)

            //this gets the list of champions so I can match the champion ID to its name
            const ddragon = this.http.get("http://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json")
            ddragon.pipe(map(responseData => {
              const array = []
              for (const key in responseData) {
                array.push(responseData[key])
              }
              return array
            })).subscribe((response) => {
              console.log(response)
              const list = []
              var champlist = response[3]
              for (const champ in champlist) {
                list.push(champlist[champ])
              }
              for (const index in list) {
                if (list[index].key == this.oppbestchamp) {

                  console.log(list[index].id)
                  this.oppbestchamp = list[index].id
                }
                if (list[index].key == this.SPbestchamp) {

                  console.log(list[index].id)
                  this.SPbestchamp = list[index].id
                }
              }

              this.SPbestchampmastery = numberWithCommas(this.SPbestchampmastery)
              this.oppbestchampmastery = numberWithCommas(this.oppbestchampmastery)

              console.log(summonerId)
              const elorequest = this.http.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${this.key}`)
              elorequest.pipe(map(responseData => {
                const array = []
                for (const key in responseData) {
                  array.push(responseData[key])
                }
                return array
              })).subscribe((response) => {

                for (var i in response) {

                  if (response[i].queueType == "RANKED_SOLO_5x5") {

                    this.opponenttier = response[i].tier

                    if (this.opponenttier != "CHALLENGER") {
                      this.opprank = response[i].rank
                    }

                    this.oppratio = Math.round((response[i].wins / (response[i].wins + response[i].losses)) * 100)

                    console.log(response)
                  }
                }
                switch (this.opponenttier) {
                  case "IRON": {
                    this.oppiron = true
                    break;
                  }
                  case "BRONZE": {
                    this.oppbronze = true
                    break;
                  }
                  case "SILVER": {
                    this.oppsilver = true
                    break;
                  }
                  case "GOLD": {
                    this.oppgold = true
                    break;
                  }
                  case "PLATINUM": {
                    this.oppplat = true
                    break;
                  }
                  case "DIAMOND": {
                    this.oppdiamond = true
                    break;
                  }
                  case "MASTER": {
                    this.oppmaster = true
                    break;
                  }
                  case "GRANDMASTER": {
                    this.oppgrandmaster = true
                    break;
                  }
                  case "CHALLENGER": {
                    this.oppchallenger = true
                    break;
                  }
                  default: {
                    this.oppunranked = true
                    break;
                  }
                }
                const summonpwnerelo = this.http.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonpwnerId}?api_key=${this.key}`)
                summonpwnerelo.pipe(map(responseData => {
                  const array = []
                  for (const key in responseData) {
                    array.push(responseData[key])
                  }
                  return array
                })).subscribe((response) => {

                  for (var i in response) {

                    if (response[i].queueType == "RANKED_SOLO_5x5") {

                      this.summonpwnertier = response[i].tier
                      this.summonpwnerrank = response[i].rank

                      this.ratio = Math.round((response[i].wins / (response[i].wins + response[i].losses)) * 100)
                      console.log(response)
                    }
                  }
                  switch (this.summonpwnertier) {
                    case "IRON": {
                      this.iron = true
                      break;
                    }
                    case "BRONZE": {
                      this.bronze = true
                      break;
                    }
                    case "SILVER": {
                      this.silver = true
                      break;
                    }
                    case "GOLD": {
                      this.gold = true
                      break;
                    }
                    case "PLATINUM": {
                      this.plat = true
                      break;
                    }
                    case "DIAMOND": {
                      this.diamond = true
                      break;
                    }
                    case "MASTER": {
                      this.master = true
                      break;
                    }
                    case "GRANDMASTER": {
                      this.grandmaster = true
                      break;
                    }
                    case "CHALLENGER": {
                      this.challenger = true
                      break;
                    }
                    default: {
                      this.unranked = true
                      break;
                    }
                  }

                  const matches = this.http.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${this.key}`)

                  matches.pipe(map(responseData => {
                    const array = []
                    console.log('---------------')

                    for (const key in responseData) {

                      if (key == "matches") {
                        array.push(responseData[key])
                      }
                    }
                    return array
                  })).subscribe((response) => {
                    console.log(response)


                    console.log(".")
                    setTimeout('', 5000);
                 
                        for (var k=0;k<15;k++){
                        
                        var gameid = response[0][k].gameId


                        const game = this.http.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${gameid}?api_key=${this.key}`)
                        game.pipe(map(responseData => {
                          const array = []
                          console.log('00000000000000000000000000000000000000000')
                          console.log(responseData)
                          for (const key in responseData) {

                            array.push(responseData[key])

                          }
                          return array
                        })).subscribe((response) => {
                          console.log(response)
                          for (i in response[12]) {
                            console.log('.........................')
                            console.log(response[12][i].player.summonerName)

                            if (response[12][i].player.summonerName.toLowerCase() == this.summonername.toLowerCase()) {
                              var oppparticipantid = response[12][i].participantId
                              console.log(oppparticipantid)
                              for (var j in response[11]) {
                                if (response[11][j].participantId == oppparticipantid) {
                                  console.log(j)
                                  this.opptotaldamage += response[11][j].stats.totalDamageDealtToChampions
                                  this.oppcs = response[11][j].stats.totalMinionsKilled + response[11][i].stats.neutralMinionsKilled
                                  this.oppvs = response[11][j].stats.visionScore
                                  this.oppkills = response[11][j].stats.kills
                                  this.oppdeaths = response[11][j].stats.deaths
                                  this.oppassists = response[11][j].stats.assists
                                  this.counter += 1
                                  console.log("AWKDASKDASKSAKDKDKASDKSAKDDSKDSAK")
                                  console.log(this.oppkills)


                                }
                              }


                            }


                          }
                          setTimeout('', 2000);
                          console.log(this.counter)
                          
                        })

                        }
          

                  })




                })
              })
            })

          })

        })


      })

    })




  }

}
