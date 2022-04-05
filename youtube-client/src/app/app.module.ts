import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './shared/components/app-routing.module';
import { AppComponent } from './app.component';
/* eslint-disable import/prefer-default-export */
import { HeaderComponent } from './core/components/header/header.component';
import { SearchComponent } from './youtube/components/search/search.component';
import { SearchResultsComponent } from './youtube/components/search/search-results/search-results.component';
import { SearchItemComponent } from './youtube/components/search/search-item/search-item.component';
import { HeaderSearchComponent } from './core/components/header/header-search/header-search.component';
import { HeaderLoginComponent } from './core/components/header/header-login/header-login.component';
import { DropdownSettingsComponent } from './youtube/components/dropdown-settings/dropdown-settings.component';
import { AngularMaterialModule } from './shared/components/angular-material.module';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { UserRegisterComponent } from './auth/pages/user-register/user-register.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    SearchResultsComponent,
    SearchItemComponent,
    HeaderSearchComponent,
    HeaderLoginComponent,
    DropdownSettingsComponent,
    LoginPageComponent,
    UserRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
