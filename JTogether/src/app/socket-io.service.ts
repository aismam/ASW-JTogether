import {Injectable, Input} from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  constructor(private socket: Socket) { }
  createSocket(username: string): void{
    const notificationSocket = this.socket.fromEvent<string>(username);
  }
}
