import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class FunctionsService {

  public responsedata=[]  
  constructor(private http: HttpClient) { }
  

  getresponsedata(URL: string){
   
    var request= this.http.get(URL)
    var res
    request.pipe(map(responseData => {
      const array = []
      for (const key in responseData) {
        array.push(responseData[key])
      }
      return array
    })).subscribe((response) => {
      this.responsedata=response
      console.log(this.responsedata)
      
    })
 
   
  }
}
