import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/search-item.model';
import { SearchResponse } from '../../models/search-response.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  selectedItem?: Item;

  @Input() searchResponse?: SearchResponse | null;

  // constructor() { }

  ngOnInit(): void {
    console.log('search-results.component');
  }

  public onSelect(item: Item): void {
    this.selectedItem = item;
  }
}
