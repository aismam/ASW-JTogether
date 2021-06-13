import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {Activity} from '../_Models/Activity';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  activities: Activity[] = [];

  constructor(
    private dataService: DataService,
    private snackBar: SnackBarService,
    private router: JRouter,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    if (!this.localStorage.getRefreshToken()){
      this.router.goLogin();
      return;
    }
    const position = this.localStorage.getPosition();
    if (position){
      this.dataService.getNearActivities(position, this.localStorage.getAccessToken() as string)
        .then(as => this.activities = as)
        .catch(e => this.snackBar.errorSnack(e.error.message));
    }
  }
}
