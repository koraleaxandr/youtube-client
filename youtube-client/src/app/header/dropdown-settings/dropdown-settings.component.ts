import { Component, OnInit, Input } from '@angular/core';
// import { settings } from '../header-search.component';

@Component({
  selector: 'app-dropdown-settings',
  templateUrl: './dropdown-settings.component.html',
  styleUrls: ['./dropdown-settings.component.scss']
})
export class DropdownSettingsComponent implements OnInit {

  @Input() settings?: string;
  searchString: string = '';
  //constructor() { }

  ngOnInit(): void {
    console.log('temporally');
  }

}
