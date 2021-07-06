import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../_Models/Message';
import {LocalStorageService} from '../local-storage.service';
import {UtilityService} from '../utility.service';

const MINE = 'mine';
const OTHER = 'other';

@Component({
  selector: 'app-chat-message-card',
  templateUrl: './chat-message-card.component.html',
  styleUrls: ['./chat-message-card.component.scss']
})
export class ChatMessageCardComponent implements OnInit {
  @Input() message: Message | undefined;
  date: string | undefined;
  cardClass = MINE;

  constructor(private localStorageService: LocalStorageService,
              private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.date = this.utilityService.formatDateTime(new Date(this.message?.time_stamp as Date).toISOString());
    this.cardClass = this.localStorageService.getUsername() as string === this.message?.username ? MINE : OTHER;
  }
}
