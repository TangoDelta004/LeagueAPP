import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  title = ''
  body = ''

  constructor(private http: HttpClient) { }

  post(){
    let post = {
      title:this.title,
      body:this.body
    }
    const request = this.http.post('http://localhost:3000/api/post', post).subscribe((responseData) => { console.log(responseData) })

  }

  ngOnInit() {
  
  }

}
