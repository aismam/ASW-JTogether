import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {Activity} from '../_Models/Activity';
import {TokensManagerService} from '../tokens-manager.service';
import {GeolocationService} from '../geolocation-service';
import {NotificationsService} from '../notifications.service';
import {LocalStorageService} from '../local-storage.service';

const COORDINATES = 0;
const ACCESS_TOKEN = 1;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(
    private dataService: DataService,
    private snackBar: SnackBarService,
    private router: JRouter,
    private geolocationService: GeolocationService,
    private tokenService: TokensManagerService,
    private notificationService: NotificationsService,
    private localStorageService: LocalStorageService
  ) { }
  activities: Activity[] = [];
  searchValue = '';
  notificationsNumber: number | undefined;

  private static requestNotifications(): Promise<void>{
    return Notification.requestPermission().then(r => r === 'granted' ? Promise.resolve() : Promise.reject('Notifiche non attive'));
  }

  ngOnInit(): void {
    this.tokenService.isLoggedIn(() => {
      this.loadHomeActivities();
      this.loadNotifications();
      this.tryTurnNotificationsOn();
    });
  }

  search(): void {
    if (this.searchValue.length){
      this.tokenService.getAccessToken()
        .then(t => this.dataService.searchActivities(this.searchValue, t))
        .then(as => this.activities = as)
        .catch(e => console.log(e));
    }
  }
  private loadNotifications(): void{
    this.dataService.loginToken(this.tokenService.getRefreshToken() as string)
      .then(u => this.notificationsNumber = u.notifications.length ? u.notifications.length : undefined)
      .catch(_ => this.router.goLogin());
  }

  private loadHomeActivities(): void{
    Promise.all([this.geolocationService.getGeolocation(), this.tokenService.getAccessToken()])
      .then(r => this.dataService.getNearActivities(r[COORDINATES], r[ACCESS_TOKEN]))
      .then(as => this.activities = as)
      .catch(e => {this.snackBar.errorSnack(e); console.log(e); });
  }

  private tryTurnNotificationsOn(): void{
    HomeComponent.requestNotifications()
      .then( _ => this.notificationService.createSocket(this.localStorageService.getUsername() as string ))
      .catch(e => this.snackBar.errorSnack(e));
  }
}
