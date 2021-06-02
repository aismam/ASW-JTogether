import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {User} from '../_Models/User';

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
