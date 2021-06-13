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
      .then(u => this.dataService.getActivities({ activities_id : u.created_activities },
                                              this.localStorage.getAccessToken() as string))
      .then(as => this.cards = as)
      .catch(e => this.snackBar.errorSnack(e.error.message));
  }

  private setUserInfo(): void {
    if (this.check) {
      this.dataService.loginToken(this.localStorage.getRefreshToken() as string).then( u => {
        this.name = u.username;
        this.email = u.email;
      });
      this.check = false;
    }
  }

  toModifyProfile(): void{
    this.route.goModifyProfile();
  }

}
