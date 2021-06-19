import {Injectable} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  constructor(private socket: Socket) { }

  createSocket(username: string): Observable<string>{
    this.socket.once('connect', () => this.socket.emit('registration', 'sas'));
    return this.socket.fromEvent<string>(username);
  }
}
