import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {
  @Output() toggle = new EventEmitter<string>();
   name = 'What are you want to find out?';
   settings: string = 'off';


  //constructor() { }

  ngOnInit(): void {
    console.log('temporally');
  }

  toggleSettings(): void {
    this.settings = this.settings ==='on'? 'off': 'on';
    this.toggle.emit(this.settings)
  }

}
