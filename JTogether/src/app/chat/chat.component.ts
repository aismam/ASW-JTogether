import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../chat.service';
import {ActivatedRoute} from '@angular/router';
import {TokensManagerService} from '../tokens-manager.service';
import {DataService} from '../data.service';
import {JRouter} from '../jrouter.service';
import {LocalStorageService} from '../local-storage.service';
import {Message} from '../_Models/Message';
import {SnackBarService} from '../snack-bar.service';

const ACTIVITY = 0;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  private sub: any;
  private activityId: string | undefined;

  message = '';
  messages: Message[] = [];

  constructor(private chatService: ChatService,
              private route: JRouter,
              private tokensManagerService: TokensManagerService,
              private dataService: DataService,
              private snackBar: SnackBarService,
              private activatedRoute: ActivatedRoute,
              private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.tokensManagerService.isLoggedIn(() => {
      this.activatedRoute.params.subscribe(p => {
        this.activityId = p.id;
        this.startChatting(p.id);
      });
    });
  }

  sendMessage(): void{
    if (this.message.length){
      this.tokensManagerService.getAccessToken()
        .then(t => this.dataService.sendMessage(
          {
            message: this.message,
            activity_id: this.activityId
          }, t))
        .then(_ => this.message = '')
        .catch(e => console.log(e));
    }
  }

  @HostListener('window:beforeunload')
  exitPage(): void{
    this.sub.unsubscribe();
    this.chatService.stopChatting();
  }

  private startChatting(chatId: string): void{
    this.tokensManagerService.getAccessToken()
      .then(t => this.dataService.getActivities({activities_id: [chatId]}, t))
      .then(c => this.messages = c[ACTIVITY].chat)
      .then(_ => console.log(this.messages))
      .then(_ => this.chatService.startChatting(chatId).subscribe(m => this.messages.push(JSON.parse(m))))
      .catch(e => this.snackBar.errorSnack(e));
  }
}
