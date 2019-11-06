import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummonersearchComponent } from './summonersearch/summonersearch.component';
import { SearchresultComponent } from './searchresult/searchresult.component';


const routes: Routes = [
  { path: '', redirectTo: '/summonersearch',pathMatch: "full" },
  { path: 'summonersearch', component: SummonersearchComponent },
  { path: 'searchresult', component: SearchresultComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
