import { Component, OnInit, Input } from '@angular/core';
import { SortSettings } from '../../models/sort-settings.model';

@Component({
  selector: 'app-dropdown-settings',
  templateUrl: './dropdown-settings.component.html',
  styleUrls: ['./dropdown-settings.component.scss'],
})
export class DropdownSettingsComponent implements OnInit {
  
  sortSettings: SortSettings = {
  sortByParameter: string = 'date';
  sortString: string = '';
  }

  @Input() settings?: string;

  // constructor() { }

  ngOnInit(): void {
    console.log('temporally');
  }
}
