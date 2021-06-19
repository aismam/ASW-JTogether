import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {TokensManagerService} from '../tokens-manager.service';
import {JRouter} from '../jrouter.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor(private dataService: DataService,
              private router: JRouter,
              private tokenManagerService: TokensManagerService) { }

  ngOnInit(): void {
    this.tokenManagerService.getAccessToken()
      .then(t => this.dataService.clearNotifications(t))
      .catch(_ => this.router.goHome());
  }

}
