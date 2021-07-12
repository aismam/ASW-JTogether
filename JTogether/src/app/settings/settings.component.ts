import { Component, OnInit } from '@angular/core';
import {TokensManagerService} from '../tokens-manager.service';
import {DataService} from "../data.service";
import {throwNullPortalOutletError} from "@angular/cdk/portal/portal-errors";
import {JRouter} from "../jrouter.service";
import {SnackBarService} from "../snack-bar.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private tokenManager: TokensManagerService,
    private dataService: DataService,
    private router: JRouter,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.tokenManager.isLoggedIn(() => {});
  }

  logout(): void{
    this.tokenManager.getAccessToken()
      .then(t => this.dataService.logout(
        {refresh_token: this.tokenManager.getRefreshToken() as string}, t)
      )
      .then(_ => this.tokenManager.unsetRefreshToken())
      .then(_ => this.router.goLogin())
      .catch(e => this.snackBar.errorSnack(e.message));
  }

}
