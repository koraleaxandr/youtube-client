import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import {
  Item,
} from '../../models/search-item.model';
import {
  SearchResponse,
} from '../../models/search-response.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  selectedItem ? : Item;

  date = new Date().toLocaleDateString('en-en');

  @Input() searchResponse ? : SearchResponse | null;

  // constructor() { }

  ngOnInit(): void {
    console.log(this.date);
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
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
    if (((getDateMonth(today) - getDateMonth(publicationDate)) == 6) && (getDateDay(today) < getDateDay(publicationDate))) {
      color = 'yellow';
      return color;
    }
    if (getDateMonth(today) - getDateMonth(publicationDate) > 1) {
      color = 'yellow';
      return color;
    }
    if ((getDateMonth(today) - getDateMonth(publicationDate) == 1) && (getDateDay(today) > getDateDay(publicationDate))) {
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
