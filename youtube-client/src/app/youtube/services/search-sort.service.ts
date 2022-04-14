import {
  Injectable,
} from '@angular/core';
import {
  Subject,
} from 'rxjs';
import {
  SortSettings,
} from '../models/sort-settings.model';
import {
  SearchResponse,
} from '../models/search-response.model';
import {
  Item,
} from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class SearchSortService {
  selectedItem ? : Item;

  sortSettings: SortSettings = {
    sortByParameter: 'snippet.publishedAt',
    sortByIncreaseParameter: 'increase',
    sortString: '',
  };

  searchResponse: SearchResponse | null = null;

  sortedSearchResult: SearchResponse | undefined = undefined;

  private changeSortedSearchResult = new Subject < SearchResponse | undefined >();

  changeSortedSearchResult$ = this.changeSortedSearchResult.asObservable();

  // constructor() { }

  public async getSearchData(): Promise < void > {
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/aaacab024b04449e1ae31a938a6983ffb7e7549a/tasks/angular/response.json
    `;
    const searchResponse: Response = await fetch(url);
    if (searchResponse.ok) {
      const data: SearchResponse = await searchResponse.json() as unknown as SearchResponse;
      this.searchResponse = data;
      this.getSearchResponse(data);
    }
  }

  async getSearchResponse(data: SearchResponse): Promise < void > {
    this.searchResponse = data;
    if (this.searchResponse) {
      this.sortedSearchResult = await JSON.parse(JSON.stringify(this.searchResponse));
      await this.sortSearchResponse(this.searchResponse);
      this.changeSortedSearchResult.next(this.sortedSearchResult);
    }
  }

  async changeSortSettings(changedSortSettings: SortSettings): Promise < void > {
    this.sortSettings = changedSortSettings;
    if (this.searchResponse) {
      this.sortedSearchResult = !this.sortSettings.sortString ? await JSON.parse(JSON.stringify(this.searchResponse)) : this.sortedSearchResult;
      await this.sortSearchResponse(this.searchResponse);
      this.changeSortedSearchResult.next(this.sortedSearchResult);
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
            this.sortedSearchResult.items = this.sortedSearchResult.items.filter((element) => (JSON.stringify(element.snippet).toString().toLowerCase().includes(sortString)));
          }
        }
      }
    }
  }

  getItemForId(id: string): Item {
    const detailedItem: Item = (this.sortedSearchResult as SearchResponse).items.filter((element) => (element.id === id))[0] as Item;
    return detailedItem;
  }
}
