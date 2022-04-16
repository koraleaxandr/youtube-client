import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
} from '@angular/router';
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
export class SearchResultsComponent implements OnInit {
  selectedItem ? : Item;

  date = new Date().toLocaleDateString('en-en');

  searchResponse: SearchResponse | undefined;

  searchSortService: SearchSortService;

  constructor(searchSortService: SearchSortService, private router: Router) {
    this.searchSortService = searchSortService;
  }

  ngOnInit(): void {
    this.searchResponse = this.searchSortService.sortedSearchResult;
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
    this.searchSortService.selectedItem = item;
    this.router.navigate(['/youtube/detailed-information/', this.selectedItem.id]);
  }
}
