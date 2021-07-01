import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {NotificationsService} from "./notifications.service";

const LOGIN = '/login';
const HOME = '/home';
const SIGNUP = '/signup';
const PROFILE = '/profile';
const MODIFY_PROFILE = '/modify-profile';
const MODIFY_ACTIVITY = '/modify-activity';
const CREATE_ACTIVITY = '/create-activity';
const PARTICIPATED_ACTIVITIES = '/participated-activity';
const NOTIFICATIONS = '/notifications';
const FORGOTTENPW = '/forgotten-password';

@Injectable({
  providedIn: 'root'
})
export class JRouter {
  constructor(private router: Router, private notificationService: NotificationsService) {}

  public goLogin(): void{
    this.notificationService.disconnect();
    this.router.navigate([LOGIN]);
  }
  public goHome(): void{
    this.router.navigate([HOME]);
  }
  public signup(): void{
    this.router.navigate([SIGNUP]);
  }
  public goProfile(): void{
    this.router.navigate([PROFILE]);
  }
  public goModifyProfile(): void{
    this.router.navigate([MODIFY_PROFILE]);
  }
  public goModifyActivity(): void{
    this.router.navigate([MODIFY_ACTIVITY]);
  }
  public goCreateActivity(): void{
    this.router.navigate([CREATE_ACTIVITY]);
  }
  public goParticipatedActivities(): void{
    this.router.navigate([PARTICIPATED_ACTIVITIES]);
  }
  public goNotifications(): void{
    this.router.navigate([NOTIFICATIONS]);
  }
  public goForgottenPassword(): void{
    this.router.navigate([FORGOTTENPW]);
  }
}
