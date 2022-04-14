import {
  Component, OnInit, Input, Output, EventEmitter,
} from '@angular/core';
import { SortSettings } from '../../models/sort-settings.model';

@Component({
  selector: 'app-dropdown-settings',
  templateUrl: './dropdown-settings.component.html',
  styleUrls: ['./dropdown-settings.component.scss'],
})
export class DropdownSettingsComponent implements OnInit {
  sortSettings: SortSettings = {
    sortByParameter: 'snippet.publishedAt',
    sortByIncreaseParameter: 'increase',
    sortString: '',
  };

  @Output() changeSortSettings = new EventEmitter<SortSettings>();

  @Input() toggleSettings?: string;

  ngOnInit(): void {
    this.changeSortSettings.emit(this.sortSettings);
  }

  changedSortSettings() {
    this.sortSettings.sortByIncreaseParameter = this.sortSettings.sortByIncreaseParameter === 'increase' ? 'decrease' : 'increase';
    this.changeSortSettings.emit(this.sortSettings);
  }

  isSortingString(): boolean {
    return !!((this.sortSettings.sortString || this.sortSettings.sortByParameter === 'string'));
  }
}
