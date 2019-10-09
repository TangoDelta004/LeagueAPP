import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';



@Component({
  selector: 'app-summonersearch',
  templateUrl: './summonersearch.component.html',
  styleUrls: ['./summonersearch.component.css']
})
export class SummonersearchComponent implements OnInit {
  passedname;
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
  }

  
  
  private async search(){
    var summonername=(<HTMLInputElement> document.getElementById("textarea1")).value;

    this.passedname=summonername  
    this.router.navigate(['/searchresult', this.passedname])
 
  }

}
