import { Component, OnInit } from '@angular/core';
import {Activity} from '../_Models/Activity';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  cards: Activity[] = [];
  activitiesID: string[] = [];

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.dataService.loginToken(this.localStorage.getRefreshToken() as string)
      .then(u => this.dataService.getActivities({ activities_id : u.created_activities },
                                              this.localStorage.getAccessToken()))
      .then(as => this.cards = as)
      .catch(e => this.snackBar.errorSnack(e.error.message));
    this.updateData();
  }

  private updateData(): void {
    this.dataService.loginToken(this.localStorage.getRefreshToken() as string)
      .then(e => {
        /*this.dataService.getActivities( {activities_id: [ e.created_activities ]}, this.localStorage.getRefreshToken())
          .then(a => console.log(a));*/
        console.log(e.created_activities);
      });
  }
}
