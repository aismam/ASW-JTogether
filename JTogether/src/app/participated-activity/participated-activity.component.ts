import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../_Models/Activity';
import {JRouter} from '../jrouter.service';
import {DataService} from '../data.service';
import {SnackBarService} from '../snack-bar.service';
import {LocalStorageService} from '../local-storage.service';
import {User} from '../_Models/User';

@Component({
  selector: 'app-participated-activity',
  templateUrl: './participated-activity.component.html',
  styleUrls: ['./participated-activity.component.scss']
})
export class ParticipatedActivityComponent implements OnInit {

  // cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  cards: Activity[] = [];
  participatedActivities: string[] = [];

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.dataService.loginToken(this.localStorage.getRefreshToken() as string)
      .then(u => u.participated_activities.forEach(e => this.participatedActivities.push(e.activity_id)))
      .then(() => this.dataService.getActivities(
        { activities_id : this.participatedActivities },
        this.localStorage.getRefreshToken() as string ))
      .then(as => this.cards = as)
      .catch(er => this.snackBar.errorSnack(er.error.message, 'Chiudi'));
  }

}
