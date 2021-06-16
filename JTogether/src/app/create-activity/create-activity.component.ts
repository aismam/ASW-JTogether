import { Component } from '@angular/core';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {GeolocationService} from '../geolocation-service';
import {TokensManagerService} from '../tokens-manager.service';

const LOCATION = 0;
const ACCESS_TOKEN = 1;

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent{

  name: string | null = null;
  location: string | null = null;
  date = new Date();
  time = this.date.getHours() + ':' + this.date.getMinutes();
  dateTime: string | undefined;
  description: string | null = null;

  constructor(
    private router: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private geolocationService: GeolocationService,
    private tokenManagerService: TokensManagerService
  ) {}

  onSubmit(value: any): void {
    value.date_time = this.date.toISOString().split('T')[0] + ' ' + value.time;
    if (Object.entries(value).find(([_, v]) => v === undefined) || new Date(value.date_time).getTime() < Date.now() ){
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
