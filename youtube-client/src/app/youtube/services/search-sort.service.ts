import { Injectable } from '@angular/core';
import { catchError, debounceTime, Subject, throwError, distinctUntilChanged } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { addStoredSearch, deleteStoredSearch } from '../../redux/actions/search.actions';
import { AppState } from '../../redux/state.models';
import { SortSettings } from '../models/sort-settings.model';
import { SearchResponse, YoutubeSearchList } from '../models/search-response.model';
import { Item } from '../models/search-item.model';
import { UserAuthServiceService } from '../../auth/services/user-auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class SearchSortService {
  selectedItem?: Item;

  sortSettings: SortSettings = {
    sortByParameter: 'snippet.publishedAt',
    sortByIncreaseParameter: 'increase',
    sortString: '',
  };

  searchResponse: SearchResponse | null = null;

  youtubeSearchList: YoutubeSearchList | null = null;

  sortedSearchResult: SearchResponse | undefined = undefined;

  private changeSortedSearchResult = new Subject<SearchResponse | undefined>();

  changeSortedSearchResult$ = this.changeSortedSearchResult.asObservable();

  searchTextChanged = new Subject<string>();

  getDetailedItem = new Subject<Item | null>();

  searchTextChanged$ = this.searchTextChanged.asObservable();

  authService: UserAuthServiceService;

  constructor(
    authService: UserAuthServiceService,
    private http: HttpClient,
    private store: Store<AppState>,
  ) {
    this.authService = authService;
    this.searchTextChanged
      .pipe(debounceTime(1000), distinctUntilChanged(), catchError(this.handleError))
      .subscribe((searchString) => {
        const MINIMAL_REQUEST_LENGTH: number = 2;
        if (searchString.length === 0) {
          this.store.dispatch(deleteStoredSearch());
        }
        if (searchString.length > MINIMAL_REQUEST_LENGTH) {
          this.getSearchData(searchString);
        }
      });
  }

  public async getSearchDataFromGit(): Promise<void> {
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/aaacab024b04449e1ae31a938a6983ffb7e7549a/tasks/angular/response.json
    `;

    this.http.get<SearchResponse>(url).subscribe((data: SearchResponse) => {
      this.searchResponse = { ...data };
      this.getSearchResponse();
    });
  }

  public async getSearchData(searchString: string): Promise<void> {
    const url = 'https://youtube.googleapis.com/youtube/v3/search?';
    this.http
      .get<YoutubeSearchList>(url, {
        params: new HttpParams()
          .set('part', 'snippet')
          .set('q', searchString.replace(' ', '%7'))
          .set('maxResults', 15)
          .set('type', 'video'),
      })
      .subscribe(async (data: YoutubeSearchList) => {
        this.youtubeSearchList = { ...data };
        await this.getStatisticsForSearchedItems();
      });
  }

  private async getStatisticsForSearchedItems(): Promise<void> {
    const searchedItemsString: string = this.getSearchStringForStatisticsQuery(
      this.youtubeSearchList,
    );
    const url: string = 'https://youtube.googleapis.com/youtube/v3/videos?';
    await this.http
      .get<SearchResponse>(url, {
        params: new HttpParams()
          .set('part', 'snippet, contentDetails, statistics')
          .set('id', searchedItemsString)
          .set('maxResults', 15)
          .set('access_token', this.authService.userSettings.userAuthToken),
      })
      .subscribe(async (data: SearchResponse) => {
        this.searchResponse = { ...data };
        this.getSearchResponse();
      });
  }

  private async getStatisticsForSearchedItem(id: string): Promise<Item | null> {
    let searchedItem: Item | null = null;
    const url: string = 'https://youtube.googleapis.com/youtube/v3/videos?';
    await this.http
      .get<SearchResponse>(url, {
        params: new HttpParams()
          .set('part', 'snippet, contentDetails, statistics')
          .set('id', id)
          .set('maxResults', 1)
          .set('access_token', this.authService.userSettings.userAuthToken),
      })
      .pipe(catchError(this.handleError))
      .subscribe(async (data: SearchResponse) => {
        const searchResponse: SearchResponse = { ...data };
        searchedItem = searchResponse.items[0];
        this.getDetailedItem.next(searchedItem);
      });
    return searchedItem;
  }

  async getSearchResponse(): Promise<void> {
    if (this.searchResponse) {
      this.sortedSearchResult = await JSON.parse(JSON.stringify(this.searchResponse));
      await this.sortSearchResponse(this.searchResponse);
      this.changeSortedSearchResult.next(this.sortedSearchResult);
      this.store.dispatch(addStoredSearch(this.sortedSearchResult as SearchResponse));
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

  async changeSortSettings(changedSortSettings: SortSettings): Promise<void> {
    this.sortSettings = changedSortSettings;
    if (this.searchResponse) {
      this.sortedSearchResult = await JSON.parse(JSON.stringify(this.searchResponse));
      await this.sortSearchResponse(this.searchResponse);
      this.changeSortedSearchResult.next(this.sortedSearchResult);
      this.store.dispatch(addStoredSearch(this.sortedSearchResult as SearchResponse));
    }
  }

  async sortSearchResponse(inputSearchResponse: SearchResponse): Promise<void> {
    if (this.sortedSearchResult?.items?.length) {
      if (this.sortSettings.sortByParameter === 'snippet.publishedAt') {
        if (this.sortSettings.sortByIncreaseParameter === 'increase') {
          this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
            let sort: number = 0;
            sort =
              Number(new Date(a.snippet.publishedAt)) - Number(new Date(b.snippet.publishedAt)) > 0
                ? 1
                : -1;
            return sort;
          });
        } else {
          this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
            let sort: number = 0;
            sort =
              Number(new Date(b.snippet.publishedAt)) - Number(new Date(a.snippet.publishedAt)) > 0
                ? 1
                : -1;
            return sort;
          });
        }
      } else if (this.sortSettings.sortByParameter === 'statistics.viewCount') {
        if (this.sortSettings.sortByIncreaseParameter === 'increase') {
          this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
            const aParameter = !Number.isNaN(a.statistics?.viewCount)
              ? Number(a.statistics?.viewCount)
              : 0;
            const bParameter = !Number.isNaN(b.statistics?.viewCount)
              ? Number(b.statistics?.viewCount)
              : 0;
            let sort: number = 0;
            sort = aParameter - bParameter > 0 ? 1 : -1;
            return sort;
          });
        } else {
          this.sortedSearchResult.items = this.sortedSearchResult.items.sort((a: Item, b: Item) => {
            let sort: number = 0;
            const aParameter = !Number.isNaN(a.statistics?.viewCount)
              ? Number(a.statistics?.viewCount)
              : 0;
            const bParameter = !Number.isNaN(b.statistics?.viewCount)
              ? Number(b.statistics?.viewCount)
              : 0;
            sort = bParameter - aParameter > 0 ? 1 : -1;
            return sort;
          });
        }
      } else {
        this.sortedSearchResult = await JSON.parse(JSON.stringify(inputSearchResponse));
        if (this.sortedSearchResult) {
          if (this.sortSettings.sortString) {
            const sortString: string = this.sortSettings.sortString.toLowerCase();
            this.sortedSearchResult.items = this.sortedSearchResult.items.filter((element) =>
              JSON.stringify(element.snippet).toString().toLowerCase().includes(sortString),
            );
          }
        }
      }
    }
  }

  private getSearchStringForStatisticsQuery(searchResponse: YoutubeSearchList | null): string {
    let queryString: string = '';
    searchResponse?.items?.forEach((element) => {
      queryString += `${element.id.videoId},`;
    });
    return queryString;
  }

  public async getItemForId(id: string): Promise<void> {
    let detailedItem: Item | null = null;
    if (this.sortedSearchResult?.items.length) {
      detailedItem = (await (this.sortedSearchResult as SearchResponse).items.filter(
        (element) => element.id === id,
      )[0]) as Item;
      this.getDetailedItem.next(detailedItem);
    } else {
      detailedItem = (await this.getStatisticsForSearchedItem(id)) as Item;
      this.getDetailedItem.next(detailedItem);
    }
    console.log(detailedItem);
    this.getDetailedItem.next(detailedItem);
  }

  private generateSearchString(searchString: string): string {
    return searchString.replace(' ', '%7');
  }
}
