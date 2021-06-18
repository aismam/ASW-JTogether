import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {SnackBarService} from '../snack-bar.service';
import {JRouter} from '../jrouter.service';

const SUCCESSFUL_REGISTRATION = 'Registrazione avvenuta con successo!';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username = undefined;
  email = undefined;
  password = undefined;
  hide = true;

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
  ) { }

  ngOnInit(): void {
  }

  goLogin($event: MouseEvent): void {
    $event.preventDefault();
    this.route.goLogin();
  }

  signup($event: MouseEvent): void {
    $event.preventDefault();
    this.dataService.signup({ username : this.username, email : this.email, password : this.password})
      .then(_ => {
        this.snackBar.normalSnack(SUCCESSFUL_REGISTRATION);
        this.route.goLogin();
      })
      .catch(e => this.snackBar.errorSnack(e.error.message)); // TODO do something else
  }

}
