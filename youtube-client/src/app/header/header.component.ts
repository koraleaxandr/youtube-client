import { Component, OnInit, Output } from '@angular/core';
import { SortSettings} from '../models/sort-settings.model';
import { SearchResponse } from '../models/search-response.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sortSettings: SortSettings = {
  sortByParameter : 'snippet.publishedAt',
  sortByIncreaseParameter: 'increase',
  sortString : ''
  }
  searchResponse: SearchResponse | null = null;
  toggleSettings: string = 'off';
  // constructor() { }

  ngOnInit(): void {
    console.log('header.component');
  }

  toggleDropSettings(toggle: string): void {
    this.toggleSettings = toggle;
  }

  getSearchResponse(data: SearchResponse) {
    this.searchResponse = data;
    if(data) this.sortSearchResponse(searchResponse);
  }

  changeSortSettings(cangedSortSettings: SortSettings) {
    this.sortSettings = cangedSortSettings;
  }

  sortSearchResponse(inputSearchResponse: SearchResponse): SearchResponse {
    const sortedSearchResult = JSON.parse(json.stringify(inputSearchResponse));
    sortedSearchResult.items = sortedSearchResult.items.sort((a, b)=> {
      a.[sortSettings.sortByParameter]-b.[sortSettings.sortByParameter]
    })
  }

}
