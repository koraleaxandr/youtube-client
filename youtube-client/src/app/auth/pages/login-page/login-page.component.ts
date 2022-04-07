import { Component, OnInit, Output, Input } from '@angular/core';
import { UserSettings } from '../../models/user-settings.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  userSettings: UserSettings = {
    userName: '',
    userPassword: '',
    userAuthToken: '',
  }

  //@Output() userSettings

  constructor() { }

  ngOnInit(): void {
  }



}
