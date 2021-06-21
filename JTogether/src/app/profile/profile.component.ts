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
  createdActivities: string[] = [];
  check: boolean; // Serve per settare il nickname solo una volta
  name: string | undefined;
  email: string | undefined;

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService
  ) { this.check = true; }

  ngOnInit(): void {
    this.setUserInfo();
    this.dataService.loginToken(this.localStorage.getRefreshToken() as string)
      .then(u => u.created_activities.forEach(e => this.createdActivities.push(e.activity_id)))
      .then(() => this.dataService.getActivities(
        { activities_id : this.createdActivities },
        this.localStorage.getRefreshToken() as string))
      .then( as => this.cards = as)
      .catch(er => this.snackBar.errorSnack(er.error.message, 'Chiudi'))
    ;
  }

  private setUserInfo(): void {
    if (this.check) {
      this.dataService.loginToken(this.localStorage.getRefreshToken() as string)
        .then( u => {
        this.name = u.username;
        this.email = u.email; })
        .catch(e => this.snackBar.errorSnack(e.error.message));
      this.check = false;
    }
  }

  toModifyProfile(): void{
    this.route.goModifyProfile();
  }

}
