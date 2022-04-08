/* eslint-disable max-classes-per-file */
import {
  Component,
  Input,
  OnInit,
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
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  userSettings: UserSettings = {
    userName: '',
    userPassword: '',
    userAuthToken: '',
    userMail: '',
    userLastName: '',
  };

  @Input() userForRegistration ? : UserSettings;

  authService: UserAuthServiceService;

  constructor(
    authService: UserAuthServiceService,
    // TODO private route: ActivatedRoute,
    private router: Router,
  ) {
    this.authService = authService;
  }

  ngOnInit(): void {
    this.userSettings = this.authService.userSettings;
    console.log(this.userSettings);
    this.registryFormGroup.controls['nameFormControl'].setValue(this.userSettings.userName);
    this.registryFormGroup.controls['passwordFormControl'].setValue(this.userSettings.userPassword);
  }

  registryFormGroup: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    nameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  matcher = new MyErrorStateMatcher();

  getRegistry() {
    console.log(this.registryFormGroup.status);
    if (this.registryFormGroup.status === 'VALID') {
      this.authService.registryUser(this.userSettings);
      this.router.navigate(['main']);
    }
  }
}
