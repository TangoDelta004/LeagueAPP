import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FunctionsService } from "../functions.service";


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(public router: Router, private functions: FunctionsService) { }

  ngOnInit() {  

  }

}
