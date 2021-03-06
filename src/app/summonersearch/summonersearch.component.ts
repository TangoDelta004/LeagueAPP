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
  error = false
  dataobj;

  P1summonername
  P2summonername


  constructor(private http: HttpClient, private router: Router, private functions: FunctionsService) { }





  ngOnInit() {

  }




  public async search() {

    var P1summonername = (<HTMLInputElement>document.getElementById("textarea1")).value;
    var P2summonername = (<HTMLInputElement>document.getElementById("textarea2")).value;
    this.base = false
    this.loading = true
    this.error= false

    const post1 = { name: P1summonername }
    const post2 = { name: P2summonername }
    const request = this.http.post('http://localhost:3000/api/getinfo', post1).subscribe((responseData) => {
      if (responseData['data'] == "error") {
        this.loading = false
        this.base = true
        this.error = true
        return
      }
      else {
        this.functions.storeP1Value(responseData)
        this.functions.storeP1Name(P1summonername)
        const request2 = this.http.post('http://localhost:3000/api/getinfo', post2).subscribe((responseData) => {
          if (responseData['data'] == "error") {
            this.loading = false
            this.base = true
            this.error = true
            return
          }
          else {
            this.functions.storeP2Value(responseData)
            this.functions.storeP2Name(P2summonername)
            this.router.navigate(['/summary'])
          }
        })
      }
    })




  }

}
