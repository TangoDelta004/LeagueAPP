import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummonersearchComponent } from './summonersearch/summonersearch.component';
import { FeaturedgamesComponent } from './featuredgames/featuredgames.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SummaryComponent } from './summary/summary.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ForumComponent } from './forum/forum.component';
import { CreatepostComponent } from './createpost/createpost.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage',pathMatch: "full" },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'summonersearch', component: SummonersearchComponent },
  { path: 'featuredgames', component: FeaturedgamesComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'createpost', component: CreatepostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
