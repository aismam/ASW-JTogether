import {Component, OnInit} from '@angular/core';
import {Activity} from '../_Models/Activity';
import {JRouter} from '../jrouter.service';
import {DataService} from '../data.service';
import {SnackBarService} from '../snack-bar.service';
import {LocalStorageService} from '../local-storage.service';
import {TokensManagerService} from '../tokens-manager.service';

@Component({
  selector: 'app-participated-activity',
  templateUrl: './participated-activity.component.html',
  styleUrls: ['./participated-activity.component.scss']
})
export class ParticipatedActivityComponent implements OnInit {

  cards: Activity[] = [];

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService,
    private tokenManagerService: TokensManagerService
  ) { }

  ngOnInit(): void {
    this.tokenManagerService.isLoggedIn(() => this.loadActivities());
  }

  private loadActivities(): void{
    this.dataService.loginToken(this.localStorage.getRefreshToken() as string)
      .then(u => this.dataService.getActivities(
        { activities_id : u.participated_activities },
        this.localStorage.getRefreshToken() as string ))
      .then(as => this.cards = as)
      .catch(er => this.snackBar.errorSnack(er.error.message, 'Chiudi'));
  }

}
