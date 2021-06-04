import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username = undefined;
  email = undefined;
  password = undefined;

  constructor(
    private route: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  goLogin($event: MouseEvent): void {
    $event.preventDefault();
    this.route.navigate(['/login']);
  }

  sign($event: MouseEvent): void {
    $event.preventDefault();
    this.dataService.signUpUser(
      { username : this.username, email : this.email, password : this.password},
      c => {
        this.snackBar.open('Registrazione avvenuta con successo!', 'Chiudi');
        this.route.navigate(['/login']);
      },
      e => {
        this.snackBar.open(e.error.message, 'Chiudi', {panelClass: 'snackbar-error'});
      }
    );
  }

}
