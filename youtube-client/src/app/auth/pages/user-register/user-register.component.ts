import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserSettings } from '../../models/user-settings.model';
import { UserAuthServiceService } from '../../services/user-auth-service.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  userSettings: UserSettings = {
    userName: '',
    userPassword: '',
    userAuthToken: '',
    userMail: '',
    userLastName: ''
  }

  @Input() userForRegistration?: UserSettings;

  authServise: UserAuthServiceService;

  constructor(authServise: UserAuthServiceService) {
    this.authServise = authServise;
   }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  matcher = new MyErrorStateMatcher();
  getRegistry(){
    this.authServise.registryUser(this.userSettings);
  }
}
