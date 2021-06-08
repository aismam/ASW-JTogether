import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {JRouter} from "../jrouter.service";
import {SnackBarService} from "../snack-bar.service";
import {LocalStorageService} from "../local-storage.service";

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {

  name = undefined;
  place = undefined;
  time = undefined;
  date = undefined;
  dateTime: string | undefined;
  description = undefined;

  constructor(
    private router: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  createActivity($event: MouseEvent): void{
    $event.preventDefault();
    this.dateTimeChecker();
    this.dataService.createActivity(
      { name: this.name, description: this.description, date_time: this.dateTime },
      this.localStorage.getAccessToken() as string)
      .then(a => {
        this.snackBar.normalSnack('Evento aggiunto con successo!');
        this.router.goHome();
      })
      .catch(e => this.snackBar.errorSnack(e.error.message));
  }

  private dateTimeChecker(): void{
    const today = new Date();
    if (this.date === undefined || this.time === undefined) {
      this.dateTime = today.toISOString() + ' ' + today.getHours() + ':00';
    } else {
      // @ts-ignore
      this.dateTime = this.date.toISOString() + ' ' + this.time;
    }
    // TODO sistema qui sotto, che sopra fa schifo
    /* this.dateTime = this.date === undefined || this.time === undefined ?
      this.dateTime = today.toISOString() + ' ' + today.getHours() + ':00' : this.dateTime = this.date.toISOString() + ' ' + this.time; */
    // console.log(this.dateTime);
  }
}
