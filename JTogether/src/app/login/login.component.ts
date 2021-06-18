import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {User} from '../_Models/User';
import {TokensManagerService} from '../tokens-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  username = 'test';
  password = 'Ismam.1997';
  hide = true;

  constructor(
    private router: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private tokensManagerService: TokensManagerService) { }

  ngOnInit(): void {

    if (this.tokensManagerService.getRefreshToken()) {
      this.dataService.loginToken(this.tokensManagerService.getRefreshToken() as string)
        .then(u => this.finalizeLogin(u))
        .catch(_ => this.tokensManagerService.unsetRefreshToken());
    }
  }

  forgottenPassword($event: MouseEvent): void {
    $event.preventDefault();
    this.router.goLogin(); /* TODO */
  }

  doLogin($event: MouseEvent): void {
    $event.preventDefault();
    this.dataService.login({username : this.username, password : this.password})
      .then(u => this.finalizeLogin(u))
      .catch(e => this.snackBar.errorSnack(e.error.message));
  }

  doSignup($event: MouseEvent): void {
    $event.preventDefault();
    this.router.signup();
  }

  private finalizeLogin(user: User): void{
    this.tokensManagerService.setRefreshToken(user.refresh_token);
    this.router.goHome();
  }

}
