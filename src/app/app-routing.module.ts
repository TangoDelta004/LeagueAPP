import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummonersearchComponent } from './summonersearch/summonersearch.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { FeaturedgamesComponent } from './featuredgames/featuredgames.component';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage',pathMatch: "full" },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'summonersearch', component: SummonersearchComponent },
  { path: 'searchresult', component: SearchresultComponent },
  { path: 'featuredgames', component: FeaturedgamesComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
