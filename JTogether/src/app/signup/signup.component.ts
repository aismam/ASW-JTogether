import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';

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
        console.log(c); /* TODO pensavo di mettere una snackbar per dire che hai creato con successo */
      },
      e => {
        console.log(e); /* TODO bisogna vedere cosa fare quando fallisce il signup */
      }
    );
  }

}
