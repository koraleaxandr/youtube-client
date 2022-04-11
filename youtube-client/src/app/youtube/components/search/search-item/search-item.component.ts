import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/search-item.model';
import { SearchSortService } from '../../../services/search-sort.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  selectedItem ? : Item;

  searchSortService: SearchSortService;

  constructor(searchSortService: SearchSortService) {
    this.searchSortService = searchSortService;
   }

  ngOnInit(): void {
    this.selectedItem = this.searchSortService.selectedItem;
  }
}
