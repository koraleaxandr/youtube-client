import { Component, Input, OnInit } from '@angular/core';
import {
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import {
  UserAuthServiceService,
} from '../../../../auth/services/user-auth-service.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
})
export class HeaderLoginComponent implements OnInit {
  @Input()name: string = 'Your Name';

  userLogoUrl: string = '../../../assets/svg/Login.svg';

  authService: UserAuthServiceService;

  subscription: Subscription;

  constructor(authService: UserAuthServiceService, private router: Router) {
    this.authService = authService;
    this.subscription = authService.changeUser$.subscribe(
      (userName) => {
        this.name = userName;
      },
    );
  }

  ngOnInit(): void {
    this.authService.getIsAuthorizedStatus();
    if (this.authService.isAuthorized === 'true') {
      this.authService.getSavedLocalUser();
      this.name = this.authService.userSettings.userName;
    } else this.router.navigate(['login']);
  }
}
