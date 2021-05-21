import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor() { }

  ngOnInit(): void {
  }

}
