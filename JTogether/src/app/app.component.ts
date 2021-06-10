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

  ngOnInit(): void {
  }
}
