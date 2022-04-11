import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import {
  SearchResponse,
} from '../../models/search-response.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() searchResponse ? : SearchResponse | undefined;

  // constructor() { }

  ngOnInit(): void {
    console.log('search.component');
  }

  changeSearchResult() {
    this.searchResponse = undefined;
  }
}
