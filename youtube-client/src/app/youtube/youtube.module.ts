import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
} from '@angular/forms';

import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchItemComponent } from './pages/search-item/search-item.component';

import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    YoutubeRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YoutubeModule { }
