import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  startChatting(activityId: string): Observable<string>{
    this.socket.disconnect();
    this.socket.connect();
    this.socket.on('connect', () => this.socket.emit('join-room', activityId));
    return this.socket.fromEvent<string>(activityId);
  }

  stopChatting(): void{
    this.socket.emit('leave-room');
  }
}
