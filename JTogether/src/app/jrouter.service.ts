import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

const LOGIN = '/login';
const HOME = '/home';
const SIGNUP = '/signup';

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
}
