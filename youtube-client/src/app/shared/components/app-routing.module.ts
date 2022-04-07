/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';
import { LoginPageComponent } from '../../auth/pages/login-page/login-page.component';
import { UserRegisterComponent } from '../../auth/pages/user-register/user-register.component';
import { NotFoundComponent } from '../../core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },  
  { path: 'register', component: UserRegisterComponent, pathMatch: 'full' },
  { path: 'login/register', component: UserRegisterComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
