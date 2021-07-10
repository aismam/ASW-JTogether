import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../_Models/Notification';

@Component({
  selector: 'app-notifications-card',
  templateUrl: './notifications-card.component.html',
  styleUrls: ['./notifications-card.component.scss']
})
export class NotificationsCardComponent implements OnInit{
  @Input() notification: Notification | undefined;
  date: Date | undefined;

  constructor(
  ) { }

  ngOnInit(): void {
    this.date = new Date(this.notification?.date_time as string);
  }
}
