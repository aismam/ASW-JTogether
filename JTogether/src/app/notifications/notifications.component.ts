import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {TokensManagerService} from '../tokens-manager.service';
import {JRouter} from '../jrouter.service';
import {Notification} from '../_Models/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] | undefined;

  constructor(private dataService: DataService,
              private router: JRouter,
              private tokenManagerService: TokensManagerService) { }

  ngOnInit(): void {
      this.dataService.loginToken(this.tokenManagerService.getRefreshToken() as string)
      .then(u => this.notifications = u.notifications)
      .then(() => this.tokenManagerService.getAccessToken())
      .then(t => this.dataService.clearNotifications(t))
      .catch(_ => this.router.goHome());
  }

}
