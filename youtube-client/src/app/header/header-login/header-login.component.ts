import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
})
export class HeaderLoginComponent implements OnInit {
  name: string = 'Your Name';

  userLogoUrl: string = '../../../assets/svg/Login.svg';
  // constructor() { }

  ngOnInit(): void {
    console.log('temporally');
  }
}
