import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './_Models/User';
import {Activity} from './_Models/Activity';

const NULL_TOKEN = null;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }
  private static refreshHeader(refreshToken: string): HttpParams{
    return new HttpParams().set('refresh_token', refreshToken);
  }

  /**
   * @param url indirizzo dove fare la richiesta
   * @param body contenuto del messaggio
   * @param token access token dell'utente che fa la richiesta
   * @param callback ritorna il risultato nel caso di esito positivo
   * @param errorCallback ritorna l'errore in caso di errori
   * @private metodo per effettuare una richiesta post all'API
   */
  private doPost<X>(url: string, body: object | null, token: string | null): Promise<X> {
   return this.httpClient.post<X>(url, body,
        {headers : { Authorization : 'bearer ' + token}, responseType : 'json'})
        .toPromise();
  }

  private doGet<X>(url: string, params?: HttpParams): Promise<X> {
    return this.httpClient.get<X>(url, {params}).toPromise();
  }

  login(user: object): Promise<User> {
    return this.doPost<User>(this.url + 'login/', user, NULL_TOKEN);
  }

  signup(user: object): Promise<User>{
    return this.doPost<User>(this.url + 'signup/', user, NULL_TOKEN);
  }

  createActivity(activity: object, accessToken: string | null): Promise<Activity>{
    return this.doPost<Activity>(this.url + 'user/create-activity', activity, accessToken);
  }

  getActivities(body: object, refreshToken: string | null): Promise<Activity[]>{
    return this.doPost<Activity[]>(this.url + 'user/get-activities', body, refreshToken);
  }

  loginToken(refreshToken: string): Promise<User> {
    return this.doGet<User>(this.url + 'login-token', DataService.refreshHeader(refreshToken));
  }

  accessToken(refreshToken: string): Promise<{ access_token: string }> {
    return this.doGet<{ access_token: string }>(this.url + 'access-token', DataService.refreshHeader(refreshToken));
  }
}
