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


  error = false
  user = ''
  pass = ''

  constructor(private http: HttpClient, private router: Router, private functions: FunctionsService) { }

  makeuser() {
    console.log(this.user)
    console.log(this.pass)
    const post = { username: this.user, password: this.pass }
    const request = this.http.post('http://localhost:3000/adduser', post).subscribe((responseData) => {
      var response: any = responseData
      console.log(response)

      if (response.response.split(":")[0] == 400) {
        console.log(responseData)
        this.error = true
      }
      else {
        this.login()
      }
    })

  }
  login() {
    console.log(this.user)
    console.log(this.pass)
    const post = { username: this.user, password: this.pass }
    const request = this.http.post<{ response: string }>('http://localhost:3000/login', post).subscribe((responseData) => {

      var response: any = responseData
      if (response.status >= 400) {
        console.log("Error trying to retrieve user")

      }
      else {
        const token = responseData.response
        this.functions.storetoken(token)
        this.functions.storeloggedin('true')
        this.functions.storeusername(this.user)
        console.log(this.user)
        this.router.navigate(['/mainpage'])

      }

    })

  }

  ngOnInit() {
  }

}
