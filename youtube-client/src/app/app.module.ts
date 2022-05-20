import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './shared/interceptors/interceptor-provider';

import { HeaderComponent } from './core/components/header/header.component';
import { HeaderSearchComponent } from './core/components/header/header-search/header-search.component';
import { HeaderLoginComponent } from './core/components/header/header-login/header-login.component';
import { DropdownSettingsComponent } from './youtube/components/dropdown-settings/dropdown-settings.component';
import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthenticationModule } from './auth/authentication.module';
import { reducers } from './redux/reducers/index';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderSearchComponent,
    HeaderLoginComponent,
    DropdownSettingsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AuthenticationModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
