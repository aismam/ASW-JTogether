import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = undefined;
  password = undefined;

  constructor(
    private route: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  forgottenPassword($event: MouseEvent): void {
    $event.preventDefault();
    this.route.navigate(['/login']); /* TODO */
  }

  log($event: MouseEvent): void {
    $event.preventDefault();
    this.dataService.logUser(
      {username : this.username, password : this.password},
      c => {
        localStorage.setItem('access_token', c.access_token.toString());
        localStorage.setItem('refresh_Token', c.refresh_token.toString());
        this.route.navigate(['/home']);
      },
      err => {
        this.snackBar.open(err.error.message, 'Chiudi', {panelClass: 'snackbar-error'});
      });
  }

  signup($event: MouseEvent): void {
    $event.preventDefault();
    this.route.navigate(['/signup']);
  }

}
