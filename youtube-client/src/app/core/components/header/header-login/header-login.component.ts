import { Component, OnInit } from '@angular/core';
import {
  Router,
} from '@angular/router';
import {
  UserAuthServiceService,
} from '../../../../auth/services/user-auth-service.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
})
export class HeaderLoginComponent implements OnInit {
  name: string = 'Your Name';

  userLogoUrl: string = '../../../assets/svg/Login.svg';

  authService: UserAuthServiceService;

  constructor(authService: UserAuthServiceService, private router: Router) {
    this.authService = authService;
  }

  ngOnInit(): void {
    if (this.authService.isAuthorized) {
      this.name = this.authService.userSettings.userName;
    } else this.router.navigate(['login']);
  }
}
