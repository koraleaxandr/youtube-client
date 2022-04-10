import {
  Component, OnInit, Output, EventEmitter,
} from '@angular/core';
import {
  Router,
} from '@angular/router';
import { SearchResponse } from '../../../../youtube/models/search-response.model';
import {
  UserAuthServiceService,
} from '../../../../auth/services/user-auth-service.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})

export class HeaderSearchComponent implements OnInit {
  @Output() toggle = new EventEmitter<string>();

  @Output() searchResponse = new EventEmitter<SearchResponse>();

  name = '';

  settings: string = 'off';

  authService: UserAuthServiceService;

  constructor(authService: UserAuthServiceService, private router: Router) {
    this.authService = authService;
  }

  ngOnInit(): void {
    console.log('temporally');
  }

  public async searchSubmit(): Promise<SearchResponse> {
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/tasks/aaacab024b04449e1ae31a938a6983ffb7e7549a/tasks/angular/response.json
    `;
    const searchResponse: Response = await fetch(url);
    const data: SearchResponse = await searchResponse.json() as unknown as SearchResponse;
    this.searchResponse.emit(data);
    this.router.navigate(['youtube-search']);
    return data;
  }

  toggleSettings(): void {
    this.settings = this.settings === 'on' ? 'off' : 'on';
    this.toggle.emit(this.settings);
  }
}
