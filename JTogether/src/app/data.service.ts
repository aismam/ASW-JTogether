import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {User} from './_Models/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000/';
  // url = 'http://localhost:3000/user/create-activity/';

  constructor(private httpClient: HttpClient) { }

  /**
   * @param url indirizzo dove fare la richiesta
   * @param body contenuto del messaggio
   * @param callback per risultato
   * @param errorCallback nel caso di errore
   * @private
   */
  private doPost<X>(url: string, body: object, callback: (_: X) => void , errorCallback: (_: any) => void): void {
    this.httpClient.post<X>(url, body,
      {headers : { Authorization : 'bearer ' }, responseType : 'json'})
      .subscribe(callback, errorCallback);
  }

  logUser(user: object, callback: (_: User) => void, errorCallback: (_: any) => void): void {
    this.doPost<User>(this.url + 'login/', user, callback, errorCallback);
  }

  signUpUser(user: object, callback: (_: User) => void, errorCallback: (_: any) => void): void {
    this.doPost<User>(this.url + 'signup/', user, callback, errorCallback);
  }

  getDataResponse(): void {
    this.httpClient.post<string>(this.url + 'login/', {
      username: 'ismam',
      password: 'Ismam.1997'},
      { headers : {
        Authorization : 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzbWFtIiwiaWF0IjoxNjIyMTI2NDE4LCJleHAiOjE2MzI0OTQ0MTh9.LC_yQSoWvApX_-X_Ew7Ykwi-6jDhKCGOO0fwRYATOzo'
      }, responseType : 'json'})
      .subscribe(
        response => {console.log(response); },
          error => {console.log(error); });
  }
}
