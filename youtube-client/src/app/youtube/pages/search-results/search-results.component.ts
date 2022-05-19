import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../redux/models/state.models';
import { getSearch } from '../../../redux/selectors/selectors';
import {
  Item,
} from '../../models/search-item.model';
import {
  SearchResponse,
} from '../../models/search-response.model';
import { SearchSortService } from '../../services/search-sort.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  search$: Observable<SearchResponse[]> = this.store.select(getSearch);

  selectedItem ? : Item;

  unsubscribe$ = new Subject<void>();

  date = new Date().toLocaleDateString('en-en');

  searchResponse: SearchResponse | undefined;

  constructor(public searchSortService: SearchSortService, private router: Router, private store: Store<AppState>) {
    this.store.subscribe((state) => console.log(state));
  }

  ngOnInit(): void {
    // this.searchResponse = this.searchSortService.sortedSearchResult;

    this.search$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      console.log(value);
      if (value[0].items.length) {
        [this.searchResponse] = value;
      }
    });
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
    this.searchSortService.selectedItem = item;
    this.router.navigate(['/youtube/detailed-information/', this.selectedItem.id]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }
}
