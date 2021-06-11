import { Component, OnInit } from '@angular/core';
import {JRouter} from '../jrouter.service';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent implements OnInit {

  constructor(
    private router: JRouter,
  ) { }

  ngOnInit(): void {
  }

  toProfile(): void{
    this.router.goProfile();
  }

  toCreateActivity(): void{
    this.router.goCreateActivity();
  }
}
