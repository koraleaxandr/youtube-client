import { Component, OnInit, Input  } from '@angular/core';
import { Item } from '../search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {

  @Input() selectedItem?: Item;
  // constructor() { }

  ngOnInit(): void {
    console.log('search-item.component');
  }
}
