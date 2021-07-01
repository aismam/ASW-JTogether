import { Component, OnInit } from '@angular/core';
import {JRouter} from '../jrouter.service';
import {DataService} from '../data.service';
import {SnackBarService} from '../snack-bar.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

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

  update(): void {
    this.dataService.forgottenPassword(
      { email: this.email, password: this.password})
      .then(() => {
        this.snackBar.normalSnack('Password modificata con successo!');
        this.route.goHome();
      })
      .catch(e => this.snackBar.errorSnack(e.error.message));
  }

}
