import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {GeolocationService} from '../geolocation-service';
import {TokensManagerService} from '../tokens-manager.service';
import * as moment from 'moment';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit{

  name: string | null = 'sas';
  location: string | null = 'via mario angeloni 37 forli italia';
  date = new Date();
  time = this.date.getHours() + ':' + this.date.getMinutes();
  dateTime: string | undefined;
  description: string | null = 'descrizione';

  constructor(
    private router: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private geolocationService: GeolocationService,
    private tokenManagerService: TokensManagerService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.tokenManagerService.isLoggedIn(() => {});
  }

  onSubmit(value: any): void {
    value.profile_pic = this.localStorageService.getPicProfile();
    value.date_time =  moment(this.date).format('YYYY-MM-DD') + ' ' + value.time;

    if (Object.entries(value).find(([_, v]) => v === undefined) || moment(value.date_time).diff(moment()) < 0 ){
      this.snackBar.errorSnack('Immettere valori validi');
    }else{
      this.tokenManagerService.getAccessToken()
        .then(r => this.dataService.createActivity(value, r))
        .then(_ => {
          this.snackBar.normalSnack('Evento aggiunto con successo!');
          this.router.goHome();
        })
        .catch(e => this.snackBar.errorSnack(e.error.message));
    }
  }
}
