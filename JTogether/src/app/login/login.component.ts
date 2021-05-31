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
    this.dataService.logUser( {username : 'lorenzo', password : 'Giovanni98.'}, u => console.log(u), err => console.log(err));
  }

}
