import { Component } from '@angular/core';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent{

  name: string | null = null;
  place: string | null = null;
  date = new Date();
  time = this.date.getHours() + ':' + this.date.getMinutes();
  dateTime: string | undefined;
  description: string | null = null;

  constructor(
    private router: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService
  ) {}

  onSubmit(value: any): void {
    value.date_time = this.date.toLocaleDateString() + ' ' + value.time;
    if (Object.entries(value).filter(([_, v]) => v === undefined) || new Date(value.date_time).getTime() < Date.now() ){
      this.snackBar.errorSnack('Immettere valori validi');
    }else{
      this.dataService.createActivity(
        { name: this.name, description: this.description, date_time: this.dateTime },
        this.localStorage.getAccessToken() as string)
        .then(a => {
          this.snackBar.normalSnack('Evento aggiunto con successo!');
          this.router.goHome();
        })
        .catch(e => this.snackBar.errorSnack(e.error.message));
    }
  }
}
