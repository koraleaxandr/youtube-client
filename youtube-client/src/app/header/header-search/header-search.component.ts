import {
  Component, OnInit, Output, EventEmitter,
} from '@angular/core';
import { SearchResponse } from '../../models/search-response.model';
import { SortSettings } from '../../models/sort-settings.model';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent implements OnInit {
  @Output() toggle = new EventEmitter<string>();

  name = 'What are you want to find out?';

  settings: string = 'off';

  // constructor() { }

  ngOnInit(): void {
    console.log('temporally');
  }

  public async searchSubmit(): Promise<SearchResponse> {
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/aaacab024b04449e1ae31a938a6983ffb7e7549a/tasks/angular/response.json
    `;
    const searchResponse: Response = await fetch(url);
    console.log(searchResponse);
    const data: SearchResponse = await searchResponse.json() as unknown as SearchResponse;
    console.log(data);
    return data;
  }

  toggleSettings(): void {
    this.settings = this.settings === 'on' ? 'off' : 'on';
    this.toggle.emit(this.settings);
  }
}
