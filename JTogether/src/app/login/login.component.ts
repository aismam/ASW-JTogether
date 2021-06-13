import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {LocalStorageService} from '../local-storage.service';
import {User} from '../_Models/User';
import {AccessTokenUpdaterService} from '../access-token-updater.service';
import { GeolocationService } from '../geolocation-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  username = 'ismo';
  password = 'sasso vero';
  hide = true;

  constructor(
    private router: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService,
    private accessTokenUpdater: AccessTokenUpdaterService,
    private locationService: GeolocationService) { }

  ngOnInit(): void {
    this.locationService.getLocation()
      .then(p => this.localStorage.setPosition(p))
      .catch(_ => this.localStorage.setPosition(null));

    if (this.localStorage.getRefreshToken()) {
      this.dataService.loginToken(this.localStorage.getRefreshToken() as string)
        .then(u => this.finalizeLogin(u))
        .catch(_ => this.localStorage.removeRefreshToken());
    }

    /*Notification.requestPermission().then(r => {
      if (r === 'granted'){
        this.notificationService.createSocket('giovanni')
          .subscribe(n => new Notification(n));
      }
    });*/
  }

  forgottenPassword($event: MouseEvent): void {
    $event.preventDefault();
    this.router.goLogin(); /* TODO */
  }

  doLogin($event: MouseEvent): void {
    $event.preventDefault();
    this.dataService.login({username : this.username, password : this.password})
      .then(u => this.finalizeLogin(u))
      .catch(e => this.snackBar.errorSnack(e.error.message));
  }

  doSignup($event: MouseEvent): void {
    $event.preventDefault();
    this.router.signup();
  }

  private finalizeLogin(user: User): void{
    this.localStorage.setAccessToken(user.access_token);
    this.localStorage.setRefreshToken(user.refresh_token);
    this.accessTokenUpdater.startUpdating(e => {
      this.localStorage.removeRefreshToken();
      this.accessTokenUpdater.stopUpdating();
      this.router.goLogin();
    });
    this.router.goHome();
  }

}
