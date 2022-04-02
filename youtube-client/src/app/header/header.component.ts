import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  SortSettings
} from '../models/sort-settings.model';
import {
  SearchResponse
} from '../models/search-response.model';
import {
  Item
} from '../models/search-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sortSettings: SortSettings = {
    sortByParameter: 'snippet.publishedAt',
    sortByIncreaseParameter: 'increase',
    sortString: ''
  }
  searchResponse: SearchResponse | null = null;
  sortedSearchResult: SearchResponse | undefined = undefined;
  toggleSettings: string = 'off';

  @Output() changeSortedSearchResult = new EventEmitter();
  // constructor() { }

  ngOnInit(): void {
    console.log('header.component');
  }

  toggleDropSettings(toggle: string): void {
    this.toggleSettings = toggle;
  }

  async getSearchResponse(data: SearchResponse): Promise < void > {
    this.searchResponse = data;
    if (this.searchResponse) {
      this.sortedSearchResult = await JSON.parse(JSON.stringify(this.searchResponse));
      await this.sortSearchResponse(this.searchResponse)
      this.changeSortedSearchResult.emit();
    }
  }

  async changeSortSettings(cangedSortSettings: SortSettings): Promise < void > {
    this.sortSettings = cangedSortSettings;
    if (this.searchResponse) {
      this.sortedSearchResult = !this.sortSettings.sortString? await JSON.parse(JSON.stringify(this.searchResponse)):this.sortedSearchResult;
      await this.sortSearchResponse(this.searchResponse)
      this.changeSortedSearchResult.emit();
      console.log('changes header')
    }
  }

  async sortSearchResponse(inputSearchResponse: SearchResponse): Promise < void > {
    if (this.sortedSearchResult) {
      if (this.sortSettings.sortByParameter === 'snippet.publishedAt') {
        if (this.sortSettings.sortByIncreaseParameter === 'increase') {
          this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
            let sort: number = 0;
            sort = (Number(new Date(a.snippet.publishedAt)) - Number(new Date(b.snippet.publishedAt))) > 0 ? 1 : -1;
            return sort;
          });
        } else {
          this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
            let sort: number = 0;
            sort = (Number(new Date(b.snippet.publishedAt)) - Number(new Date(a.snippet.publishedAt))) > 0 ? 1 : -1;
            return sort;
          });
        }
      } else if (this.sortSettings.sortByParameter === 'statistics.viewCount') {
        if (this.sortSettings.sortByIncreaseParameter === 'increase') {
          this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
            let sort: number = 0;
            sort = (Number(a.statistics.viewCount) - Number(b.statistics.viewCount)) > 0 ? 1 : -1;
            return sort;
          });
        } else {
          this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
            let sort: number = 0;
            sort = (Number(b.statistics.viewCount) - Number(a.statistics.viewCount)) > 0 ? 1 : -1;
            return sort;
          });
        }
      } else {
        this.sortedSearchResult = await JSON.parse(JSON.stringify(inputSearchResponse));
        if (this.sortedSearchResult) {
          if (this.sortSettings.sortString) {
            const sortString: string = this.sortSettings.sortString.toLowerCase();
            console.log(sortString);
            this.sortedSearchResult.items = this.sortedSearchResult.items.filter((element) => {
              return JSON.stringify(element.snippet).toString().toLowerCase().includes(sortString);
              //console.log(JSON.stringify(element.snippet.description).toString().toLowerCase())
            });
            console.log(this.sortedSearchResult.items.length)
          }
        }
      }
    }
  }

}
