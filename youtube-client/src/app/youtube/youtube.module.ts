import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchItemComponent } from './pages/search-item/search-item.component';

import { YoutubeRoutingModule } from './youtube-routing.module';
import { ColorOnDateDirective } from './directives/color-on-date.directive';
import { BoxShadowColorizingDirective } from './directives/box-shadow-colorizing.directive';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
    ColorOnDateDirective,
    BoxShadowColorizingDirective,
    AdminPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    YoutubeRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YoutubeModule { }
