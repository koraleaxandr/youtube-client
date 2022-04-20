import {
  Injectable,
} from '@angular/core';
import {
  catchError,
  // debounce,
  debounceTime,
  Subject,
  // Observable,
  throwError,
} from 'rxjs';
import {
  HttpClient,
  // HttpHeaders,
  // HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
// import { catchError, retry } from 'rxjs/operators';

import {
  SortSettings,
} from '../models/sort-settings.model';
import {
  SearchResponse,
  YoutubeSearchList,
} from '../models/search-response.model';
import {
  Item,
  // SearchedItem,
} from '../models/search-item.model';
import {
  UserAuthServiceService,
} from '../../auth/services/user-auth-service.service';

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

  youtubeSearchList: YoutubeSearchList | null = null;

  sortedSearchResult: SearchResponse | undefined = undefined;

  private changeSortedSearchResult = new Subject < SearchResponse | undefined >();

  changeSortedSearchResult$ = this.changeSortedSearchResult.asObservable();

  searchTextChanged = new Subject <string>();

  searchTextChanged$ = this.searchTextChanged.asObservable();

  authService: UserAuthServiceService;

  constructor(authService: UserAuthServiceService, private http: HttpClient) {
    this.authService = authService;
    this.searchTextChanged.pipe(
      debounceTime(3000),
      catchError(this.handleError),
    ).subscribe((searchString) => {
      console.log(searchString);
      this.getSearchData(searchString);
    });
  }

  public async getSearchDataFromGit(): Promise < void > {
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/aaacab024b04449e1ae31a938a6983ffb7e7549a/tasks/angular/response.json
    `;

    this.http.get<SearchResponse>(url).subscribe((data: SearchResponse) => {
      this.searchResponse = { ...data };
      console.log(this.searchResponse);
      this.getSearchResponse();
    });
  }

  public async getSearchData(searchString: string): Promise < void > {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchString.replace(' ', '%7')}&type=video&key=${this.authService.userSettings.userAuthToken}`;

    console.log(url);

    this.http.get<SearchResponse>(url).subscribe((data: SearchResponse) => {
      this.searchResponse = { ...data };
      console.log(this.youtubeSearchList);
      this.getSearchResponse();
    });
  }

  async getSearchResponse(): Promise < void > {
    if (this.searchResponse) {
      this.sortedSearchResult = await JSON.parse(JSON.stringify(this.searchResponse));
      await this.sortSearchResponse(this.searchResponse);
      this.changeSortedSearchResult.next(this.sortedSearchResult);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
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
            const aParameter = !Number.isNaN(a.statistics?.viewCount) ? Number(a.statistics?.viewCount) : 0;
            const bParameter = !Number.isNaN(b.statistics?.viewCount) ? Number(b.statistics?.viewCount) : 0;
            let sort: number = 0;
            sort = (aParameter - bParameter) > 0 ? 1 : -1;
            return sort;
          });
        } else {
          this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
            let sort: number = 0;
            const aParameter = !Number.isNaN(a.statistics?.viewCount) ? Number(a.statistics?.viewCount) : 0;
            const bParameter = !Number.isNaN(b.statistics?.viewCount) ? Number(b.statistics?.viewCount) : 0;
            sort = (bParameter - aParameter) > 0 ? 1 : -1;
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
    const detailedItem: Item = ((this.sortedSearchResult as SearchResponse).items).filter((element) => (element.id.videoId === id))[0] as Item;
    return detailedItem;
  }

  private generateSearchString(searchString: string): string {
    return searchString.replace(' ', '%7');
  }
}
