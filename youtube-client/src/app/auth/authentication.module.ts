import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../shared/components/angular-material.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';

import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    UserRegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AngularMaterialModule,
    AuthenticationRoutingModule,
  ],
})
export class AuthenticationModule { }
