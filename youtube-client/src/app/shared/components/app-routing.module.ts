/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../../auth/pages/login-page/login-page.component';
import { UserRegisterComponent } from '../../auth/pages/user-register/user-register.component';
import { NotFoundComponent } from '../../core/components/not-found/not-found.component';
import { SearchComponent } from '../../youtube/components/search/search.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: UserRegisterComponent, pathMatch: 'full' },
  { path: 'login/register', component: UserRegisterComponent, pathMatch: 'full' },
  { path: 'main', component: SearchComponent, pathMatch: 'full' },
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
