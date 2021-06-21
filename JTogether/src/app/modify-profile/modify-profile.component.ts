import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {JRouter} from '../jrouter.service';
import {DataService} from '../data.service';
import {SnackBarService} from '../snack-bar.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.scss']
})
export class ModifyProfileComponent implements OnInit {

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  modifyProfile(): void{

  }

  deleteProfile(): void{
    this.dataService.deleteProfile(
      { refresh_token : this.localStorage.getRefreshToken()},
      this.localStorage.getRefreshToken() as string)
      .then(m => {
        this.snackBar.normalSnack('Il profilo é stato eliminato correttamente!');
        this.route.goLogin();
      })
      .catch(er => this.snackBar.errorSnack(er.message));
  }

}
