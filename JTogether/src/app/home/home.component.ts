import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // cards: Activity[] = [];


  constructor(
    private route: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.dataService.logToken(
      localStorage.getItem('refresh_Token'),
      { refresh_token : localStorage.getItem('refresh_Token')},
      c => {
        this.snackBar.open('OnInit con successo!', 'Chiudi');
        console.log(c);
        this.generatePage(c.activities_created);
      },
      e => {
        this.snackBar.open(e.error.message, 'Chiudi');
      }
    );
  }

  private generatePage(activities: string[]): void {
    this.dataService.getActivities(
      { activities_id : activities },
      localStorage.getItem('refresh_Token'),
      c => {
        console.log('generate page successo ' + c.length);
        c.forEach(e => {
          console.log(e);
        });
        console.log(c.toString());
      },
      e => {
        console.log('generate page Fallito come te');
        // console.log('[' + activities.toString() + ']');
      });
  }

}
