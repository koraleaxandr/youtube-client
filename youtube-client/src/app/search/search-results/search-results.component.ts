import {
  Component,
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
export class SearchResultsComponent {
  selectedItem ? : Item;

  date = new Date().toLocaleDateString('en-en');

  @Input() searchResponse ? : SearchResponse | null;

  onSelect(item: Item): void {
    this.selectedItem = item;
  }
}
