import {HostListener, Injectable, OnDestroy} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService{
  constructor(private socket: Socket) { }

  createSocket(username: string): void{
    this.socket.disconnect();
    this.socket.connect();
    this.socket.on('connect', () => this.socket.emit('registration', username));
    this.socket.fromEvent<string>(username).subscribe(m => new Notification(m));
  }
}
