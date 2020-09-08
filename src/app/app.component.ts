import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import {  Router } from '@angular/router';
import { FunctionsService } from "./functions.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'LeagueAPP';

  message: string

  loggedin = false
  token: string

  constructor(public router: Router, private functions: FunctionsService, private changeDetector: ChangeDetectorRef) { }


  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {

    
    this.token = this.functions.gettoken()
    this.functions.currentMessage.subscribe(message => {
      
      if (message == "true") {
        this.loggedin = true
     
      }
      else{
       
        this.loggedin = false
      }
    })

  }

  mainnav() {
    this.router.navigate(['mainpage']);
  }


  openNav() {
    document.getElementById("mySidenav").style.width = "20vw";
    document.getElementById("main").style.marginLeft = "20vw";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

}
