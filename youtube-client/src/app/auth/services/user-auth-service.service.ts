import {
  Injectable,
} from '@angular/core';
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

  public isAuthorized: boolean = false;

  // constructor() { }
  getIsAuthorizedStatus(): void {
    this.isAuthorized = localStorage.getItem('isAuthorized') ? localStorage.getItem('isAuthorized') as unknown as boolean : false;
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
    console.log(JSON.stringify(newUser));
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
      if (newUser.userName === localSavedUser.userName) {
        newUser = localSavedUser;
        this.isAuthorized = true;
        localStorage.setItem('isAuthorized', 'true');
      }
    }
  }
}
