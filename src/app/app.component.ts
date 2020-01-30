import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LeagueAPP';

  constructor(public router: Router){}

  
  mainnav(){
    this.router.navigate(['mainpage']);
  }


  openNav() {
    document.getElementById("mySidenav").style.width = "20vw";
    document.getElementById("main").style.marginLeft = "20vw";
  }
  
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

}
