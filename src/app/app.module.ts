import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { SummonersearchComponent } from './summonersearch/summonersearch.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { FeaturedgamesComponent } from './featuredgames/featuredgames.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ForumComponent } from './forum/forum.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { NavComponent } from './nav/nav.component';




@NgModule({
  declarations: [
    AppComponent,
    SummonersearchComponent,
    FeaturedgamesComponent,
    MainpageComponent,
    SummaryComponent,
    ProfileComponent,
    LoginComponent,
    ForumComponent,
    CreatepostComponent,
    NavComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
