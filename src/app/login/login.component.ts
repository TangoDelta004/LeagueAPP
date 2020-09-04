import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FunctionsService } from "../functions.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  
  user = ''
  pass = ''

  constructor(private http: HttpClient, private router: Router, private functions: FunctionsService) { }

  makeuser(){
    console.log(this.user)
    console.log(this.pass)
    const post = { username:this.user,password: this.pass}
    const request = this.http.post('http://localhost:3000/getuser', post).subscribe((responseData) => {console.log(responseData)})

  }

  ngOnInit() {
  }

}
