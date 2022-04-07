import {
  EventEmitter,
  Injectable, Output, Input
} from '@angular/core';
import {
  UserSettings
} from '../models/user-settings.model';

@Injectable({
  providedIn: 'root'
})

export class UserAuthServiceService {
  public isAuthorized: boolean = false;

  @Input()
  userForRegistration!: UserSettings;

  @Output() getRegistration = new EventEmitter<UserSettings>();

  //constructor() { }
  getSavedLocalUser(): UserSettings | null {
    if (localStorage.getItem('savedLocalUser')) {
      const savedLocalUser: UserSettings = JSON.parse(localStorage.getItem('savedUser') as string) as UserSettings;
      return savedLocalUser;
    } else return null;
  }

  saveLocalUser(user: UserSettings) {
    localStorage.setItem('savedUser', JSON.stringify(user))
  }

  registryUser(userForRegistration: UserSettings) {
    userForRegistration.userAuthToken = this.getUserAuthToken(userForRegistration);
    this.saveLocalUser(userForRegistration);
    this.isAuthorized = true;
    console.log(JSON.stringify(userForRegistration))
  }

  getUserAuthToken(user: UserSettings): string  {
    user.userAuthToken = 'balaBlaUserToken12345678';
    const token = 'balaBlaUserToken12345678';
    return token;
  }

  autoriseUser(user: UserSettings) {
    const localSavedUser: UserSettings | null = this.getSavedLocalUser();
    if (localSavedUser) {
      if (user.userName === localSavedUser.userName) {
        user = localSavedUser;
        this.isAuthorized = true;
      } else {
        this.getRegistration.emit(user);
      }
    }
  }
}
