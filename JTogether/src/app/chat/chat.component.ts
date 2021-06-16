import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  numbers = [1 , 2 , 3 , 4 , 5];

  constructor() { }

  ngOnInit(): void {
  }

}
