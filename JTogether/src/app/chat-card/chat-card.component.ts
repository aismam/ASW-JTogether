import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit {

  s = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}
