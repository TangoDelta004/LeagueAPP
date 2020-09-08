import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from "../functions.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public router: Router, private functions: FunctionsService) { }


  logout(){
    console.log('logging out')
    this.functions.storeloggedin('false')
    this.functions.storetoken('')
    this.router.navigate(['mainpage']);
  }

  ngOnInit() {
  }

}
