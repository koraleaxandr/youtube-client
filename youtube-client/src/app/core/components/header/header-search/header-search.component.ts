import {
  Component, Output, EventEmitter,
} from '@angular/core';
import {
  Router,
} from '@angular/router';
import { SearchResponse } from '../../../../youtube/models/search-response.model';
import {
  UserAuthServiceService,
} from '../../../../auth/services/user-auth-service.service';
import { SearchSortService } from '../../../../youtube/services/search-sort.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})

export class HeaderSearchComponent {
  @Output() toggle = new EventEmitter<string>();

  @Output() searchResponse = new EventEmitter<SearchResponse>();

  name = '';

  settings: string = 'off';

  authService: UserAuthServiceService;

  searchSortService: SearchSortService;

  constructor(authService: UserAuthServiceService, private router: Router, searchSortService: SearchSortService) {
    this.authService = authService;
    this.searchSortService = searchSortService;
  }

  public async searchSubmit(): Promise<void> {
    if (this.authService.isAuthorized === 'true') {
      this.searchSortService.getSearchData();
      this.router.navigate(['youtube-search']);
    }
  }

  toggleSettings(): void {
    this.settings = this.settings === 'on' ? 'off' : 'on';
    this.toggle.emit(this.settings);
  }
}
