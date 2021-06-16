import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {Activity} from '../_Models/Activity';
import {TokensManagerService} from '../tokens-manager.service';
import {GeolocationService} from '../geolocation-service';

const COORDINATES = 0;
const ACCESS_TOKEN = 1;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  activities: Activity[] = [];
  searchValue = '';

  constructor(
    private dataService: DataService,
    private snackBar: SnackBarService,
    private router: JRouter,
    private geolocationService: GeolocationService,
    private tokenService: TokensManagerService
  ) { }

  ngOnInit(): void {
    Promise.all([this.geolocationService.getGeolocation(), this.tokenService.getAccessToken()])
      .then(r => this.dataService.getNearActivities(r[COORDINATES], r[ACCESS_TOKEN]))
      .then(as => this.activities = as.concat(as).concat(as).concat(as))
      .catch(e => {
        this.snackBar.errorSnack(e.error.message);
        this.router.goLogin();
      });
  }

  search(): void {
    if (this.searchValue.length){
      this.tokenService.getAccessToken()
        .then(t => this.dataService.searchActivities(this.searchValue, t))
        .then(as => this.activities = as)
        .catch(e => this.snackBar.errorSnack(e));
    }
  }
}
