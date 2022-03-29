import { Component, OnInit } from '@angular/core';
import { searchResponse } from '../youtube-response';
import { Item } from '../../models/search-item.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  selectedItem?: Item;

  // constructor() { }

  ngOnInit(): void {
    console.log('search-results.component');
  }

  response = searchResponse;

  public onSelect(item: Item): void {
    this.selectedItem = item;
  }
}
