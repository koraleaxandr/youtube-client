import { Component, OnInit } from '@angular/core';
// import { SearchResponse } from "../search-response.model";
import { searchResponse } from '../youtube-response';
import { Item } from '../search-item.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  selectedItem?: Item;

  constructor() { }

  ngOnInit(): void {
  }

  response = searchResponse;

  onSelect(item: Item): void {
    this.selectedItem = item;
  }
}
