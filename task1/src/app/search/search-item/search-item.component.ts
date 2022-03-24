import { Component, OnInit } from '@angular/core';
import { Item } from '../search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
