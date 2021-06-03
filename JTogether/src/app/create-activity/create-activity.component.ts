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
    this.dataService.createActivity(
      { name: this.name, description: this.description, date_time: '2021-05-03 ' + this.time },
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

}
