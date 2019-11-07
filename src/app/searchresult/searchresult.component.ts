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

  key = 'RGAPI-1b82014d-0e71-4b0a-8025-11a315cd35b8'

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
    var dataobj = this.functions.getValue()

    console.log(dataobj)

    this.P1summonername = dataobj.P1summonername
    this.P2summonername = dataobj.P2summonername
    console.log(this.P1summonername)
    console.log(this.P2summonername)

    switch (dataobj.P1tier) {
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
    switch (dataobj.P2tier) {
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

 
    this.P1rank =dataobj.P1rank
    this.P1tier= dataobj.P1tier

    this.P1ratio = dataobj.P1ratio
    this.P1kills = dataobj.P1kills
    this.P1deaths = dataobj.P1deaths
    this.P1assists = dataobj.P1assists
    this.P1totaldamage = dataobj.P1totaldamage
    this.P1bestchamp = dataobj.P1bestchamp
    this.P1bestchampmastery = dataobj.P1bestchampmastery
    this.P1totalmastery = dataobj.P1totalchampmastery
    this.P1cs = dataobj.P1cs
    this.P1creepP1ermin10 = dataobj.P1creepspermin10
    this.P1creepP1ermin20 = dataobj.P1creepspermin20
    this.P1goldpermin10 = dataobj.P1goldpermin10
    this.P1goldpermin20 = dataobj.P1goldpermin20
    this.P1xppermin10 = dataobj.P1xppermin10
    this.P1xppermin20 = dataobj.P1xppermin20
    this.P1vs = dataobj.P1vs
    this.P1visionwards = dataobj.P1visionwards
    this.P1objdamage = dataobj.P1objdamage
    this.P1turretdamage = dataobj.P1turretdamage
    this.P1turretkills = dataobj.P1turretkills
    this.P1inhibkills = dataobj.P1inhibkills
    this.P1dragonkills = dataobj.P1dragonkills
    this.P1baronkills = dataobj.P1baronkills
    this.P1riftkills = dataobj.P1riftkills
    this.P1csdiff10 = dataobj.P1csdiff10
    this.P1csdiff20 = dataobj.P1csdiff20
    this.P1xpdiffpermin10 = dataobj.P1xpdiffpermin10
    this.P1xpdiffpermin20 = dataobj.P1xpdiffpermin20
    this.P1killingspree = dataobj.P1killingspree
    this.P1multikill = dataobj.P1multikill






    this.P2rank =dataobj.P2rank
    this.P2tier= dataobj.P2tier

    this.P2ratio = dataobj.P2ratio
    this.P2kills = dataobj.P2kills
    this.P2deaths = dataobj.P2deaths
    this.P2assists = dataobj.P2assists
    this.P2totaldamage = dataobj.P2totaldamage
    this.P2bestchamp = dataobj.P2bestchamp
    this.P2bestchampmastery = dataobj.P2bestchampmastery
    this.P2totalmastery = dataobj.P2totalchampmastery
    this.P2cs = dataobj.P2cs
    this.P2creepspermin10 = dataobj.P2creepspermin10
    this.P2creepspermin20 = dataobj.P2creepspermin20
    this.P2goldpermin10 = dataobj.P2goldpermin10
    this.P2goldpermin20 = dataobj.P2goldpermin20
    this.P2xppermin10 = dataobj.P2xppermin10
    this.P2xppermin20 = dataobj.P2xppermin20
    this.P2vs = dataobj.P2vs
    this.P2visionwards = dataobj.P2visionwards
    this.P2objdamage = dataobj.P2objdamage
    this.P2turretdamage = dataobj.P2turretdamage
    this.P2turretkills = dataobj.P2turretkills
    this.P2inhibkills = dataobj.P2inhibkills
    this.P2dragonkills = dataobj.P2dragonkills
    this.P2baronkills = dataobj.P2baronkills
    this.P2riftkills = dataobj.P2riftkills
    this.P2csdiff10 = dataobj.P2csdiff10
    this.P2csdiff20 = dataobj.P2csdiff20
    this.P2xpdiffpermin10 = dataobj.P2xpdiffpermin10
    this.P2xpdiffpermin20 = dataobj.P2xpdiffpermin20
    this.P2killingspree = dataobj.P2killingspree
    this.P2multikill = dataobj.P2multikill





  }

}
