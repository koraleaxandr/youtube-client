import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchItemComponent } from './pages/search-item/search-item.component';

import { YoutubeRoutingModule } from './youtube-routing.module';
import { ColorOnDateDirective } from './directives/color-on-date.directive';
import { BoxShadowColorizingDirective } from './directives/box-shadow-colorizing.directive';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
    ColorOnDateDirective,
    BoxShadowColorizingDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    YoutubeRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YoutubeModule { }
