import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { SummonersearchComponent } from './summonersearch/summonersearch.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchresultComponent } from './searchresult/searchresult.component';



@NgModule({
  declarations: [
    AppComponent,
    SummonersearchComponent,
    SearchresultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
