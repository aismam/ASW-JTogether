import { Component, OnInit } from '@angular/core';
import {Activity} from '../_Models/Activity';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {LocalStorageService} from '../local-storage.service';
import {TokensManagerService} from '../tokens-manager.service';

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
  userProfilePic: string | undefined;

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService,
    private tokenManager: TokensManagerService,
  ) { this.check = true; }

  ngOnInit(): void {
    this.tokenManager.isLoggedIn(() => {
      this.setUserInfo();
      this.activityFiller();
    });
  }

  private activityFiller(): void {
    this.dataService.loginToken(this.localStorage.getRefreshToken() as string)
      .then(u => this.createdActivities = u.created_activities)
      .then(_ => this.tokenManager.getAccessToken())
      .then(t => this.dataService.getActivities(
        { activities_id : this.createdActivities }, t))
      .then( as => this.cards = as)
      .catch(er => this.snackBar.errorSnack(er.error.message, 'Chiudi'));
  }

  private setUserInfo(): void {
    if (this.check) {
      this.dataService.loginToken(this.localStorage.getRefreshToken() as string)
        .then( u => {
          this.name = u.username;
          this.email = u.email;
          this.userProfilePic = u.profile_pic;
        })
        .catch(e => this.snackBar.errorSnack(e.error.message));
      this.check = false;
    }
  }

  toModifyProfile(): void{
    this.route.goModifyProfile();
  }

}
