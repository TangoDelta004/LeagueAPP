import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest,HttpHeaders } from '@angular/common/http';
import { FunctionsService } from "../functions.service";
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  title = ''
  body = ''

  constructor(private http: HttpClient,private functions: FunctionsService) { }

  post(){
    let post = {
      username:this.functions.getusername() ,
      title:this.title,
      body:this.body
    }

    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.functions.gettoken());

    const httpOptions = {
      headers: headers_object
    };

    const request = this.http.post('http://localhost:3000/api/post',post,httpOptions).subscribe((responseData) => { console.log(responseData) })

  }

  ngOnInit() {
  
  }

}
