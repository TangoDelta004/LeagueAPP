import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FunctionsService } from "../functions.service";




@Component({
  selector: 'app-summonersearch',
  templateUrl: './summonersearch.component.html',
  styleUrls: ['./summonersearch.component.css']
})
export class SummonersearchComponent implements OnInit {
  passedname;
  base = true;
  loading = false
  dataobj;

  constructor(private http: HttpClient, private router: Router, private functions: FunctionsService) { }



  post: {
    name: string,
    id: string

  }

  ngOnInit() {
    this.functions.currentMessage.subscribe(dataobj => this.dataobj = dataobj)
  }


  private async search() {

    var P1summonername = (<HTMLInputElement>document.getElementById("textarea1")).value;
    var P2summonername = (<HTMLInputElement>document.getElementById("textarea2")).value;
    this.base = false
    this.loading = true
    
    const post1 = { name1: P1summonername, name2: P2summonername }

    const request = this.http.post('http://localhost:3000/api/posts', post1).subscribe((responseData) => {
      console.log("HELLOOOOOO")
      const request2 = this.http.get('http://localhost:3000/api/posts').subscribe((responseData) => {
       //console.log(responseData)
       
       //this.newMessage(responseData)
       this.functions.storeValue(responseData)
      

       this.router.navigate(['/searchresult'])
      })
    })
 


  }
  newMessage(responseData) {
    this.functions.changeMessage(responseData)
  }

}
