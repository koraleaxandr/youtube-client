/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
// import { UserRegisterComponent } from './auth/pages/user-register/user-register.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SearchResultsComponent } from './youtube/pages/search-results/search-results.component';
import { SearchItemComponent } from './youtube/pages/search-item/search-item.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  // { path: 'login', component: LoginPageComponent },
  // { path: 'register', component: UserRegisterComponent, pathMatch: 'full' },
  { path: 'youtube-search', component: SearchResultsComponent, pathMatch: 'full' },
  { path: 'main', component: SearchResultsComponent, pathMatch: 'full' },
  { path: 'detailed-information/:id', component: SearchItemComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
