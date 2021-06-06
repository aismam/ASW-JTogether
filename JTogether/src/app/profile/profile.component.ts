import { Component, OnInit } from '@angular/core';
import {Activity} from '../_Models/Activity';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
        this.generatePage(c.created_activities);
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
