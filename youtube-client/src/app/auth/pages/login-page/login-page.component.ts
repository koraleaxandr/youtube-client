import {
  Component,
  OnInit,
  // Output,
  // Input
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Router,
} from '@angular/router';
import {
  UserSettings,
} from '../../models/user-settings.model';
import {
  UserAuthServiceService,
} from '../../services/user-auth-service.service';
import {
  MyErrorStateMatcher,
} from '../../services/error-state.service';

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

  matcher = new MyErrorStateMatcher();

  authService: UserAuthServiceService;

  // @Output() userSettings

  constructor(authService: UserAuthServiceService, private router: Router) {
    this.authService = authService;
  }

  ngOnInit(): void {
    this.authService.logInOutUser('false');
    const savedUser: UserSettings | null = this.authService.getSavedLocalUser();
    console.log(JSON.stringify(savedUser));
    this.userSettings.userName = savedUser?.userName as string;
    this.authorizeForm.controls['nameFormControl'].setValue(this.userSettings.userName);
  }

  private passwordMatchingValidator(): boolean {
    if (this.authorizeForm.controls['passwordFormControl'].value === this.authService.getSavedLocalUser()?.userPassword as string) {
      console.log('true');
      return true;
    }
    console.log('not math password');
    return false;
  }

  public authorizeForm: FormGroup = new FormGroup({
    nameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  public getUserSettings() {
    this.userSettings.userName = this.authorizeForm.controls['nameFormControl'].value;
    this.userSettings.userPassword = this.authorizeForm.controls['passwordFormControl'].value;
    this.authorizeUserSettings();
  }

  private authorizeUserSettings() {
    console.log(JSON.stringify(this.userSettings));
    if (this.userSettings.userName === this.authService.getSavedLocalUser()?.userName) {
      const matchPassword: boolean = this.passwordMatchingValidator();
      console.log(this.authorizeForm.status);
      if (this.authorizeForm.status === 'VALID' && matchPassword) {
        this.authService.authorizeUser(this.userSettings);
        this.router.navigate(['main']);
      } else this.authorizeForm.controls['passwordFormControl'].setValue('');
    } else {
      this.authService.userSettings = this.userSettings;
      this.authorizeForm.controls['nameFormControl'].setValue('');
      this.authorizeForm.controls['passwordFormControl'].setValue('');
    }
  }
}
