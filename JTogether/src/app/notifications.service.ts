import {HostListener, Injectable, OnDestroy} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService{

  constructor(private socket: Socket) { }

  createSocket(username: string): Observable<string>{
    this.socket.on('connect', () => this.socket.emit('registration', username));
    return this.socket.fromEvent<string>(username);
  }
  disconnect(): void {
    this.socket.disconnect();
  }
}
