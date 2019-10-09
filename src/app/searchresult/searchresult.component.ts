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
  champion = ''
  oppiron = false
  oppbronze = false
  oppsilver = false
  oppgold = false
  oppplat = false
  oppdiamond = false
  oppmaster = false
  oppgrandmaster = false
  oppchallenger = false
  iron = false
  bronze = false
  silver = false
  gold = false
  plat = false
  diamond = false
  master = false
  grandmaster = false
  challenger = false
  key = 'RGAPI-5736a2ae-b159-44aa-a706-3ac12ccdbf79'


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {

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
    var summonpwnerId = ''
    var winner = ''

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

      const masteryrequest = this.http.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${this.key}`)
      masteryrequest.pipe(map(responseData => {
        const array = []
        for (const key in responseData) {
          array.push(responseData[key])
        }
        return array
      })).subscribe((response) => {
        console.log(response)
        const bestchamp = response[0].championId
        const bestchampmastery = response[0].championPoints


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

          const masteryrequest = this.http.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonpwnerId}?api_key=${this.key}`)
          masteryrequest.pipe(map(responseData => {
            const array = []
            for (const key in responseData) {
              array.push(responseData[key])
            }
            return array
          })).subscribe((response) => {
            console.log(response)
            const bestchamp2 = response[0].championId
            const bestchampmastery2 = response[0].championPoints

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
                if (list[index].key == bestchamp) {

                  console.log(list[index].id)
                  this.champion = list[index].id
                }
              }
              if (bestchampmastery2 > bestchampmastery) {
                winner = "Summonpwner"
                this.winner = winner
                this.resultsobtained = true
                this.summonwins = true
              }
              else {
                winner = this.summonername
                this.winner = winner
                this.resultsobtained = true
                this.opponentwins = true
              }
              console.log(summonerId)
              const elorequest = this.http.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${this.key}`)
              elorequest.pipe(map(responseData => {
                const array = []
                for (const key in responseData) {
                  array.push(responseData[key])
                }
                return array
              })).subscribe((response) => {
                console.log(response)
                console.log(response[0].tier)
                const opponentrank = response[0].tier
                switch (opponentrank) {
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
                    //statements; 
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
                  const summonpwnerrank = response[1].tier
                  console.log(response)
                  switch (summonpwnerrank) {
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
                      //statements; 
                      break;
                    }
                  }
                })
              })
            })

          })

        })


      })

    })




  }
}
