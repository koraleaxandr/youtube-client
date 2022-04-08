import {
  EventEmitter,
  Injectable,
  Output,
  Input,
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

  @Input()
    userForRegistration!: UserSettings;

  @Output() getRegistration = new EventEmitter < UserSettings >();

  // constructor() { }
  getSavedLocalUser(): UserSettings | null {
    if (localStorage.getItem('savedLocalUser')) {
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
    this.isAuthorized = true;
    console.log(JSON.stringify(newUser));
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
      } else {
        this.getRegistration.emit(newUser);
      }
    }
  }
}
