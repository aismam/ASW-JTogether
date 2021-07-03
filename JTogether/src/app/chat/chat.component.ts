import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../chat.service';
import {ActivatedRoute} from '@angular/router';
import {TokensManagerService} from '../tokens-manager.service';
import {DataService} from '../data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  message = '';
  messages: string[] = [];
  username = '';
  private sub: any;

  constructor(private chatService: ChatService,
              private route: ActivatedRoute,
              private tokensManagerService: TokensManagerService,
              private dataService: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe(r => this.startChatting(r.id));
  }

  sendMessage(): void{
    if (this.message.length){
      this.chatService.sendMessage(this.username + ': ' + this.message);
      this.message = '';
    }
  }

  @HostListener('window:beforeunload')
  exitPage(): void{
    this.sub.unsubscribe();
    this.chatService.stopChatting();
  }

  private startChatting(chatId: string): void{
    this.dataService.loginToken(this.tokensManagerService.getRefreshToken() as string)
      .then(u => {
        this.chatService.startChatting(chatId).subscribe(m => this.messages.push(m));
        this.username = u.username;
      })
      .catch(console.log);
  }
}
