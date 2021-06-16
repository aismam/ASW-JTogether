import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.scss']
})
export class ChatMessageListComponent implements OnInit {

  numbers = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit(): void {
  }

}
