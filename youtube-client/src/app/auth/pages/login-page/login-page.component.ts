import {
  Component,
  OnInit,
  // Output,
  // Input
} from '@angular/core';
import {
  UserSettings,
} from '../../models/user-settings.model';
import {
  UserAuthServiceService,
} from '../../services/user-auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  userSettings: UserSettings = {
    userName: '',
    userPassword: '',
    userAuthToken: '',
    userMail: '',
    userLastName: '',
  };

  authService: UserAuthServiceService;

  // @Output() userSettings

  constructor(authService: UserAuthServiceService) {
    this.authService = authService;
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    const savedUser: UserSettings | null = this.authService.getSavedLocalUser();
    this.userSettings = savedUser || this.userSettings;
  }

  getUserSettings() {
    this.authService.authorizeUser(this.userSettings);
  }
}
