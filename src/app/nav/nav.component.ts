import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import {  Router } from '@angular/router';
import { FunctionsService } from "../functions.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {



  loggedin = false
  token: string

  constructor(public router: Router, private functions: FunctionsService, private changeDetector: ChangeDetectorRef) { }


  mainnav() {
    this.router.navigate(['mainpage']);
  }

  ngOnInit() {
    let loggedin = this.functions.getloggedin()
    if (loggedin == "true"){
      this.loggedin=true
    }
    this.token = this.functions.gettoken()


  }

}
