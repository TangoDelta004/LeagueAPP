import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';




@Component({
  selector: 'app-summonersearch',
  templateUrl: './summonersearch.component.html',
  styleUrls: ['./summonersearch.component.css']
})
export class SummonersearchComponent implements OnInit {
  passedname;
  constructor(private http: HttpClient,private router: Router) { }

  post: {
    name: string,
    id : string

  }

  ngOnInit() {
    const request2=this.http.get('http://localhost:3000/api/posts').subscribe((responseData)=>{
      console.log(responseData)
    })
  }
  
  
  private async search(){
    var summonername=(<HTMLInputElement> document.getElementById("textarea1")).value;

    this.passedname=summonername  
    const post1 = { name: summonername, id: "hello"}
    
    const request=this.http.post('http://localhost:3000/api/posts',post1).subscribe((responseData)=>{
    
    })
    this.router.navigate(['/searchresult', this.passedname])
 
  }

}
