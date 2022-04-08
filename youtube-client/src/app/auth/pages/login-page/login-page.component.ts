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
    const savedUser: UserSettings | null = this.authService.getSavedLocalUser();
    this.userSettings.userName = savedUser?.userName || '';
    this.authorizeForm.controls['nameFormControl'].setValue(this.userSettings.userName);
  }

  passwordMatchingValidator(): boolean {
    if (this.authorizeForm.controls['passwordFormControl'].value === this.authService.getSavedLocalUser()?.userPassword as string) {
      return true;
    }
    return false;
  }

  authorizeForm: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    nameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  getUserSettings() {
    console.log(this.userSettings);
    // if (this.authorizeForm.status === 'VALID' && this.passwordMatchingValidator()) {
    //   this.authService.registryUser(this.userSettings);
    //   this.router.navigate(['main']);
    // }
    this.authService.authorizeUser(this.userSettings);
  }
}
