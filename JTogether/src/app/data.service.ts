import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {User} from './_Models/User';
import {Activity} from './_Models/Activity';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  /**
   * @param url indirizzo dove fare la richiesta
   * @param body contenuto del messaggio
   * @param token access token dell'utente che fa la richiesta
   * @param callback ritorna il risultato nel caso di esito positivo
   * @param errorCallback ritorna l'errore in caso di errori
   * @private metodo per effettuare una richiesta post all'API
   */
  private doPost<X>(url: string, body: object | null, token: string | null,
                    callback: (_: X) => void ,
                    errorCallback: (_: any) => void): void {
    this.httpClient.post<X>(url, body,
      {headers : { Authorization : 'bearer ' + token}, responseType : 'json'})
      .subscribe(callback, errorCallback);
  }

  logUser(user: object, callback: (_: User) => void, errorCallback: (_: any) => void): void {
    this.doPost<User>(this.url + 'login/', user, null, callback, errorCallback);
  }

  signUpUser(user: object, callback: (_: User) => void, errorCallback: (_: any) => void): void {
    this.doPost<User>(this.url + 'signup/', user, null, callback, errorCallback);
  }

  createActivity(activity: object, token: string | null, callback: (_: Activity) => void, errorCallback: (_: any) => void): void{
    this.doPost<Activity>(this.url + 'user/create-activity', activity, token, callback, errorCallback);
  }

  getActivities(body: object, token: string | null, callback: (_: Activity[]) => void, errorCallback: (_: any) => void): void{
    this.doPost<Activity[]>(this.url + 'user/get-activities', body, token, callback, errorCallback);
  }

  logToken(token: string | null, user: object, callback: (_: User) => void, errorCallback: (_: any) => void): void {
    const params = new HttpParams({fromString: 'refresh_token=' + token});
    this.httpClient.request<User>('GET', this.url + 'log-token', {
      params, responseType: 'json'
    }).subscribe(callback, errorCallback);
    this.httpClient.get<User>(this.url + 'log-token',
      {});
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
