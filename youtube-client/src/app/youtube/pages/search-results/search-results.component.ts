import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../redux/state.models';
import {
  Item,
} from '../../models/search-item.model';
import {
  SearchResponse,
} from '../../models/search-response.model';
import { SearchSortService } from '../../services/search-sort.service';
import { VideoCard } from '../../models/video-card.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  selectedItem ? : Item;

  unsubscribe$ = new Subject<void>();

  date = new Date().toLocaleDateString('en-en');

  createdCards: VideoCard[] = [];

  searchResponse: SearchResponse | undefined;

  constructor(public searchSortService: SearchSortService, private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.pipe(takeUntil(this.unsubscribe$)).subscribe((state) => {
      this.searchResponse = state.searchReducer.search ? state.searchReducer.search[state.searchReducer.search.length - 1]! : undefined;
      this.createdCards = state.videoCardsReducer.cards?.length ? state.videoCardsReducer.cards : [];
      console.log(this.searchResponse);
      console.log(state);
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
