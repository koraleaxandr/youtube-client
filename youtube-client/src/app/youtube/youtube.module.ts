import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
} from '@angular/forms';

import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchItemComponent } from './pages/search-item/search-item.component';

import { YoutubeRoutingModule } from './youtube-routing.module';
import { ColorOnDateDirective } from './directives/color-on-date.directive';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
    ColorOnDateDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    YoutubeRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YoutubeModule { }
