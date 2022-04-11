import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggleSettings: string = 'off';

  // constructor() {}

  ngOnInit(): void {
    console.log('header.component');
  }

  toggleDropSettings(toggle: string): void {
    this.toggleSettings = toggle;
  }  
}
