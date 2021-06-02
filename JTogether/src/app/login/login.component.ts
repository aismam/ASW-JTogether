import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';

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
  ) { }

  ngOnInit(): void {
  }

  forgottenPassword($event: MouseEvent): void {
    this.route.navigate(['/login']); /* TODO */
  }

  log($event: MouseEvent): void {
    $event.preventDefault();
    this.dataService.logUser(
      {username : this.username, password : this.password},
      u => {
        console.log(u);
        this.route.navigate(['/home']);
      },
      err => console.log(err)); /* TODO bisogna decidere cosa fare se arriviamo qui */
  }

}
