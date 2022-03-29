import { Component, OnInit } from '@angular/core';
import { SortSettings} from '../models/sort-settings.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sortSettings: SortSettings = {
  sortByParameter: string = 'date';
  sortString: string = '';
  }
  settings: string = 'off';
  // constructor() { }

  ngOnInit(): void {
    console.log('header.component');
  }

  toggleSettings(settings: string): void {
    this.settings = settings;
  }
}
