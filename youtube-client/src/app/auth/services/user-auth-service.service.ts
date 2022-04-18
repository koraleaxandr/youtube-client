import {
  Injectable,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  UserSettings,
} from '../models/user-settings.model';

@Injectable({
  providedIn: 'root',
})

export class UserAuthServiceService {
  public userSettings: UserSettings = {
    userName: '',
    userPassword: '',
    userAuthToken: '',
    userMail: '',
    userLastName: '',
  };

  redirectUrl: string | null = null;

  public isAuthorized: string = 'false';

  private changeUserSource = new Subject<string>();

  changeUser$ = this.changeUserSource.asObservable();

  // constructor() { }
  getIsAuthorizedStatus(): void {
    this.isAuthorized = localStorage.getItem('isAuthorized') ? localStorage.getItem('isAuthorized') as string : 'false';
    this.userSettings.userName = this.isAuthorized === 'true' ? this.getSavedLocalUser()?.userName as string : '';
  }

  getSavedLocalUser(): UserSettings | null {
    if (localStorage.getItem('savedUser')) {
      const savedLocalUser: UserSettings = JSON.parse(localStorage.getItem('savedUser') as string) as UserSettings;
      return savedLocalUser;
    } return null;
  }

  saveLocalUser(user: UserSettings) {
    localStorage.setItem('savedUser', JSON.stringify(user));
  }

  registryUser(user: UserSettings) {
    const newUser: UserSettings = user;
    newUser.userAuthToken = this.getUserAuthToken(user);
    this.saveLocalUser(newUser);
    this.authorizeUser(newUser);
  }

  getUserAuthToken(user: UserSettings): string {
    const newUser: UserSettings = user;
    newUser.userAuthToken = 'balaBlaUserToken12345678';
    const token = 'balaBlaUserToken12345678';
    return token;
  }

  authorizeUser(user: UserSettings) {
    this.userSettings = user;
    let newUser: UserSettings = user;
    const localSavedUser: UserSettings | null = this.getSavedLocalUser();
    if (localSavedUser) {
      if (newUser.userMail === localSavedUser.userMail) {
        newUser = localSavedUser;
        this.logInOutUser('true');
        localStorage.setItem('isAuthorized', 'true');
        this.changeUserSource.next(newUser.userName);
      }
    }
  }

  logInOutUser(status: string) {
    localStorage.setItem('isAuthorized', status);
    this.isAuthorized = status;
  }
}
