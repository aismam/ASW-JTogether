import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notifications-card',
  templateUrl: './notifications-card.component.html',
  styleUrls: ['./notifications-card.component.scss']
})
export class NotificationsCardComponent implements OnInit {
  @Input() imageUrl: string | undefined;
  ev = 'Biciclettata contro Brando';
  constructor() { }

  ngOnInit(): void {
  }

}
