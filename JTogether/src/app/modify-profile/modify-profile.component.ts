import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {JRouter} from '../jrouter.service';
import {DataService} from '../data.service';
import {SnackBarService} from '../snack-bar.service';
import {LocalStorageService} from '../local-storage.service';
import {TokensManagerService} from '../tokens-manager.service';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.scss']
})
export class ModifyProfileComponent implements OnInit {

  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  hide = true;

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService,
    private tokenManager: TokensManagerService,
  ) { }

  ngOnInit(): void {
    this.tokenManager.isLoggedIn(() => {});
  }

  modifyProfile(): void{
    console.log('mess: ' + this.username + ' ' + this.email + ' ' + this.password);
    this.dataService.modifyProfile(
      { username : this.username, password : this.password, email : this.email},
      this.localStorage.getRefreshToken() as string)
      .then(() => {
        this.snackBar.normalSnack('Profilo aggiornato');
        this.route.goLogin();
      })
      .catch(err => this.snackBar.errorSnack(err.error.message));
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
