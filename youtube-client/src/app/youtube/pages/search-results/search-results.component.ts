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
    this.router.navigate(['detailed-information/', this.selectedItem.id]);
  }

  getColorPublicationDate(publishedAt: string): string {
    let color = 'green';
    const millisecondsInWeek: number = 7 * 24 * 60 * 60 * 1000;
    const today = new Date('2019-10-15T15:00:14.000Z');
    const publicationDate = new Date(publishedAt);
    const getDateYear = (date: Date): number => Number(date.getUTCFullYear());
    const getDateMonth = (date: Date): number => (Number(date.getUTCMonth() + 1) + getDateYear(date) * 12);
    const getDateDay = (date: Date): number => Number(date.getUTCDate());

    if ((getDateMonth(today) - getDateMonth(publicationDate)) > 6) {
      color = 'red';
      return color;
    }
    if (((getDateMonth(today) - getDateMonth(publicationDate)) === 6) && (getDateDay(today) < getDateDay(publicationDate))) {
      color = 'yellow';
      return color;
    }
    if (getDateMonth(today) - getDateMonth(publicationDate) > 1) {
      color = 'yellow';
      return color;
    }
    if ((getDateMonth(today) - getDateMonth(publicationDate) === 1) && (getDateDay(today) > getDateDay(publicationDate))) {
      color = 'yellow';
      return color;
    }
    if ((Number(today) - Number(publicationDate.getTime())) <= millisecondsInWeek) {
      color = 'blue';
      return color;
    }
    return color;
  }
}
