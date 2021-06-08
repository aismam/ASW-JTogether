import { Component, OnInit } from '@angular/core';
import {NotificationService} from './socket-io.service';
import {JRouter} from './jrouter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'JTogether';
  constructor(private notificationService: NotificationService, private router: JRouter) {}

  ngOnInit(): void {
    /*Notification.requestPermission().then(r => {
      if (r === 'granted'){
        this.notificationService.createSocket('giovanni')
          .subscribe(n => new Notification(n));
      }
    });*/
  }
}
