import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  toggleSettings: string = 'off';

  toggleDropSettings(toggle: string): void {
    this.toggleSettings = toggle;
  }
}
