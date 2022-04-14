import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './core/components/header/header.component';
import { SearchResultsComponent } from './youtube/pages/search-results/search-results.component';
import { SearchItemComponent } from './youtube/pages/search-item/search-item.component';
import { HeaderSearchComponent } from './core/components/header/header-search/header-search.component';
import { HeaderLoginComponent } from './core/components/header/header-login/header-login.component';
import { DropdownSettingsComponent } from './youtube/components/dropdown-settings/dropdown-settings.component';
import { AngularMaterialModule } from './shared/components/angular-material.module';
// import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
// import { UserRegisterComponent } from './auth/pages/user-register/user-register.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthenticationModule } from './auth/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultsComponent,
    SearchItemComponent,
    HeaderSearchComponent,
    HeaderLoginComponent,
    DropdownSettingsComponent,
    // LoginPageComponent,
    // UserRegisterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AuthenticationModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
