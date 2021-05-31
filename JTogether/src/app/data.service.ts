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
  private doPost<X>(url: string, body: X, callback: (_: X) => void , errorCallback: (_: any) => void): void {
    // this.httpClient.post<X>(url, body).subscribe(callback, errorCallback);
    this.httpClient.post<string>(
      url,
      body,
      {headers : { Authorization : 'bearer ' }, responseType : 'json'})
      .subscribe(
        response => console.log('ciao'),
      error => console.log(error));
    console.log(body);
  }

  logUser(callback: (_: string) => void, errorCallback: (_: any) => void): void {
    this.doPost<string>(this.url + 'login/', JSON.stringify({ username: 'ismam', password: 'Ismam.1997'}), callback, errorCallback);
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

  /**
   * crea mappa
   * riempi con 2 valori
   * passa mappa
   */

  getDataResponsefake(): void {
    const body = JSON.stringify({username: 'ismam', password: 'Ismam.1997'});
    const bodyez = new Map([ ['username', 'ismam'], ['password', 'Ismam.1997'] ]);
    bodyez.set('email', 'ismam@gmail.com');
    bodyez.delete('username');
    /* delete bodyez['username'];
    bodyez['email'] = 'ismam@gmail.com'; */

    this.httpClient.post<string>(this.url + 'login/', {bodyez})
      .subscribe(
        response => {console.log(response); },
        error => {console.log(error); });
  }



}
