import { Component, OnInit, Output, Input } from '@angular/core';
import { UserSettings } from '../../models/user-settings.model';
import { UserAuthServiceService } from '../../services/user-auth-service.service';

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
    userMail: '',
    userLastName: ''
  }
  authServise: UserAuthServiceService;

  //@Output() userSettings

  constructor(authServise: UserAuthServiceService) { 
    this.authServise = authServise;
  }

  ngOnInit(): void {
  }

getUserSettings() {
  this.authServise.autoriseUser(this.userSettings);
}

}
