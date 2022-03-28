import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  settings: string = 'off';


  // constructor() { }

  ngOnInit(): void {
    console.log('header.component');
  }

  toggleSettings(settings: string): void {
    this.settings = settings;
  }

}
