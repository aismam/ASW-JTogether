import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

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
    private route: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  createActivity($event: MouseEvent): void{
    $event.preventDefault();
    this.dateTimeChecker();
    this.dataService.createActivity(
      { name: this.name, description: this.description, date_time: this.dateTime },
      localStorage.getItem('access_token'),
      c => {
        this.snackBar.open('Evento aggiunto con successo!', 'Chiudi');
        this.route.navigate(['/home']);
      },
      e => {
        this.snackBar.open(e.error.message, 'Chiudi', {panelClass: 'snackbar-error'});
      }
    );
  }

  private dateTimeChecker(): void{
    const today = new Date();
    if (this.date === undefined || this.time === undefined) {
      this.dateTime = today.toISOString() + ' ' + today.getHours() + ':00';
    } else {
      // @ts-ignore
      this.dateTime = this.date.toISOString() + ' ' + this.time;
    }
    /* this.dateTime = this.date === undefined || this.time === undefined ?
      this.dateTime = today.toISOString() + ' ' + today.getHours() + ':00' : this.dateTime = this.date.toISOString() + ' ' + this.time; */
    // console.log(this.dateTime);
  }
}
