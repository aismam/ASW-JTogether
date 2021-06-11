import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

const LOGIN = '/login';
const HOME = '/home';
const SIGNUP = '/signup';
const PROFILE = '/profile';
const MODIFY_ACTIVITY = '/modify-activity';
const CREATE_ACTIVITY = '/create-activity';

@Injectable({
  providedIn: 'root'
})
export class JRouter {
  constructor(private router: Router) {}

  public goLogin(): void{
    this.router.navigate([LOGIN]);
  }
  public goHome(): void{
    this.router.navigate([HOME]);
  }
  public signup(): void{
    this.router.navigate([SIGNUP]);
  }
  public goProfile(): void{
    this.router.navigate([PROFILE]);
  }
  public goModifyActivity(): void{
    this.router.navigate([MODIFY_ACTIVITY]);
  }
  public goCreateActivity(): void{
    this.router.navigate([CREATE_ACTIVITY]);
  }
}
