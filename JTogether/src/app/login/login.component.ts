import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mannaaggia = '';

  constructor(
    private route: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
  }

  random(): void {
    this.route.navigate(['/home']);
  }

  log($event: MouseEvent): void {
    $event.preventDefault();

    this.dataService.getDataResponsefake();

    /* this.dataService.logUser(
      user => this.mannaaggia = user,
      error => console.log(error)); */
  }

}
