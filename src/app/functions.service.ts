import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  
  
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();


  constructor(private http: HttpClient) { }
  

  changeMessage(message: string) {
    this.messageSource.next(message)
  }


  storetoken(token){
    localStorage.setItem("token", token)
  }

  gettoken(){
    return localStorage.getItem('token')

  }

  storeloggedin(loggedin){
    localStorage.setItem("loggedin", loggedin)
  }

  getloggedin(){
    return localStorage.getItem('loggedin')

  }

  storeP1Value(responseData){
    var dataobj = responseData
    localStorage.setItem("P1", JSON.stringify(dataobj))
  }
 
  getP1Value(){ 
    return JSON.parse(localStorage.getItem("P1")) 
  }


  storeP2Value(responseData){
    var dataobj = responseData
    localStorage.setItem("P2", JSON.stringify(dataobj))
  }
 
  getP2Value(){
    return JSON.parse(localStorage.getItem("P2")) 
  }
   

  storeP1Name(name){
    localStorage.setItem("P1name", name)
  }
 
  getP1Name(){ 
    return localStorage.getItem("P1name") 
  }

  storeP2Name(name){
    localStorage.setItem("P2name", name)
  }
 
  getP2Name(){ 
    return localStorage.getItem("P2name") 
  }


}

