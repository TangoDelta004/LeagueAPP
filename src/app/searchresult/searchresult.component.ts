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




  color = 'blue'



  P1summonername = ''
  P2summonername = ''

  P1tier = ""
  P1rank = ""
  P2tier = ""
  P2rank = ""

  P2bestchamp = ""
  P2bestchampmastery = ""
  P2totalmastery = ""
  P1bestchamp = ""
  P1bestchampmastery = ""
  P1totalmastery = ""

  P2iron = false
  P2bronze = false
  P2silver = false
  P2gold = false
  P2plat = false
  P2diamond = false
  P2master = false
  P2grandmaster = false
  P2challenger = false
  P2unranked = false
  P1iron = false
  P1bronze = false
  P1silver = false
  P1gold = false
  P1plat = false
  P1diamond = false
  P1master = false
  P1grandmaster = false
  P1challenger = false
  P1unranked = false

  P2ratio = 0
  P1ratio = 0

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
  P2baronkills = 0
  P2dragonkills = 0
  P2riftkills = 0






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
  P1creepP1ermin10 = 0
  P1creepP1ermin20 = 0
  P1csdiff10 = 0
  P1csdiff20 = 0
  P1goldpermin10 = 0
  P1goldpermin20 = 0
  P1xppermin10 = 0
  P1xppermin20 = 0
  P1xpdiffpermin10 = 0
  P1xpdiffpermin20 = 0
  P1baronkills = 0
  P1dragonkills = 0
  P1riftkills = 0



  counter = 0
  counter2 = 0


  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private functions: FunctionsService) { }


  details() {
    var data = {
      // kills: this.oppkills
    }

    this.router.navigate(['/searchresult', data])
  }



  ngOnInit() {


    //this.functions.currentMessage.subscribe(dataobj => this.dataobj = dataobj)
    var P1 = this.functions.getP1Value().object
    var P2 = this.functions.getP2Value().object
    console.log(P1)
    console.log(P2)

    this.P1summonername = P1.summonername
    this.P2summonername = P2.summonername


    switch (P1.tier) {
      case "UNRANKED":
        this.P1unranked = true
        break;
      case "IRON":
        this.P1iron = true
        break;
      case "BRONZE":
        this.P1bronze = true
        break;
      case "SILVER":
        this.P1silver = true
        break;
      case "GOLD":
        this.P1gold = true
        break;
      case "PLATINUM":
        this.P1plat = true
        break;
      case "DIAMOND":
        this.P1diamond = true
        break;
      case "MASTER":
        this.P1master = true
        break;
      case "GRANDMASTER":
        this.P1grandmaster = true
        break;
      case "CHALLENGER":
        this.P1challenger = true
        break;

      default:
        this.P1unranked = true
    }
    switch (P2.tier) {
      case "UNRANKED":
        this.P2unranked = true
        break;
      case "IRON":
        this.P2iron = true
        break;
      case "BRONZE":
        this.P2bronze = true
        break;
      case "SILVER":
        this.P2silver = true
        break;
      case "GOLD":
        this.P2gold = true
        break;
      case "PLATINUM":
        this.P2plat = true
        break;
      case "DIAMOND":
        this.P2diamond = true
        break;
      case "MASTER":
        this.P2master = true
        break;
      case "GRANDMASTER":
        this.P2grandmaster = true
        break;
      case "CHALLENGER":
        this.P2challenger = true
        break;

      default:
        this.P2unranked = true
    }

 
    this.P1rank =P1.rank
    this.P1tier= P1.tier

    this.P1ratio = P1.ratio
    this.P1kills = P1.kills
    this.P1deaths = P1.deaths
    this.P1assists = P1.assists
    this.P1totaldamage = P1.totaldamage
    this.P1bestchamp = P1.bestchamp
    this.P1bestchampmastery = P1.bestchampmastery
    this.P1totalmastery = P1.totalchampmastery
    this.P1cs = P1.P1cs
    this.P1creepP1ermin10 = P1.creepspermin10
    this.P1creepP1ermin20 = P1.creepspermin20
    this.P1goldpermin10 = P1.goldpermin10
    this.P1goldpermin20 = P1.goldpermin20
    this.P1xppermin10 = P1.xppermin10
    this.P1xppermin20 = P1.xppermin20
    this.P1vs = P1.P1vs
    this.P1visionwards = P1.visionwards
    this.P1objdamage = P1.objdamage
    this.P1turretdamage = P1.turretdamage
    this.P1turretkills = P1.turretkills
    this.P1inhibkills = P1.inhibkills
    this.P1dragonkills = P1.dragonkills
    this.P1baronkills = P1.baronkills
    this.P1riftkills = P1.riftkills
    this.P1csdiff10 = P1.csdiff10
    this.P1csdiff20 = P1.csdiff20
    this.P1xpdiffpermin10 = P1.xpdiffpermin10
    this.P1xpdiffpermin20 = P1.xpdiffpermin20
    this.P1killingspree = P1.killingspree
    this.P1multikill = P1.multikill






    this.P2rank =P2.rank
    this.P2tier= P2.tier

    this.P2ratio = P2.ratio
    this.P2kills = P2.kills
    this.P2deaths = P2.deaths
    this.P2assists = P2.assists
    this.P2totaldamage = P2.totaldamage
    this.P2bestchamp = P2.bestchamp
    this.P2bestchampmastery = P2.bestchampmastery
    this.P2totalmastery = P2.totalchampmastery
    this.P2cs = P2.cs
    this.P2creepspermin10 = P2.creepspermin10
    this.P2creepspermin20 = P2.creepspermin20
    this.P2goldpermin10 = P2.goldpermin10
    this.P2goldpermin20 = P2.goldpermin20
    this.P2xppermin10 = P2.xppermin10
    this.P2xppermin20 = P2.xppermin20
    this.P2vs = P2.vs
    this.P2visionwards = P2.visionwards
    this.P2objdamage = P2.objdamage
    this.P2turretdamage = P2.turretdamage
    this.P2turretkills = P2.turretkills
    this.P2inhibkills = P2.inhibkills
    this.P2dragonkills = P2.dragonkills
    this.P2baronkills = P2.baronkills
    this.P2riftkills = P2.riftkills
    this.P2csdiff10 = P2.csdiff10
    this.P2csdiff20 = P2.csdiff20
    this.P2xpdiffpermin10 = P2.xpdiffpermin10
    this.P2xpdiffpermin20 = P2.xpdiffpermin20
    this.P2killingspree = P2.killingspree
    this.P2multikill = P2.multikill





  }

}
