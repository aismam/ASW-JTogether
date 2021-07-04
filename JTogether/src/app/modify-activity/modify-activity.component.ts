import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {JRouter} from '../jrouter.service';
import {DataService} from '../data.service';
import {SnackBarService} from '../snack-bar.service';
import {LocalStorageService} from '../local-storage.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-modify-activity',
  templateUrl: './modify-activity.component.html',
  styleUrls: ['./modify-activity.component.scss']
})
export class ModifyActivityComponent{

  name: string | null = null;
  location: string | null = null;
  date = new Date();
  time = this.date.getHours() + ':' + this.date.getMinutes();
  dateTime: string | undefined;
  description: string | null = null;

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService,
    private  activatedRoute: ActivatedRoute
  ) { }

  onSubmit(value: any): void {
    if (Object.entries(value).find(([_, v]) => v === undefined) || new Date(value.date_time).getTime() < Date.now() ){
      this.snackBar.errorSnack('Immettere valori validi');
    } else {
      this.activatedRoute.params.subscribe(p => this.performModifyActivity(value, p.id));
    }
  }

  private performModifyActivity(value: any, activityId: string): void{
    console.log(activityId);
    this.dataService.modifyActivity(
      { activity_id: activityId,
        name : this.name,
        description : this.description,
        location : this.location,
        date_time : this.date.toISOString().split('T')[0] + ' ' + value.time},
      this.localStorage.getRefreshToken() as string)
      .then(() => {
        this.snackBar.normalSnack('Evento modificato con successo!');
        this.route.goHome();
      })
      .catch(er => this.snackBar.errorSnack(er.error.message));
  }
}
