import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: UserRegisterComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
