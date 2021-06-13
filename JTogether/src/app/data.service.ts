import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './_Models/User';
import {Activity} from './_Models/Activity';
import {Geolocation} from "./_Models/Geolocation";
import {longitudeKeys} from "geolib";

const NULL_TOKEN = null;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverUrl = 'http://localhost:3000/';
  private userPath = 'user/';

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

  private doGet<X>(url: string, token: string | null, params?: HttpParams): Promise<X> {
    return this.httpClient.get<X>(url, {params, headers : { Authorization : 'bearer ' + token}}).toPromise();
  }

  login(user: object): Promise<User> {
    return this.doPost<User>(this.serverUrl + 'login/', user, NULL_TOKEN);
  }

  signup(user: object): Promise<User>{
    return this.doPost<User>(this.serverUrl + 'signup/', user, NULL_TOKEN);
  }

  createActivity(activity: object, accessToken: string): Promise<Activity>{
    return this.doPost<Activity>(this.serverUrl + this.userPath + 'create-activity', activity, accessToken);
  }

  getActivities(body: object, refreshToken: string ): Promise<Activity[]>{
    return this.doPost<Activity[]>(this.serverUrl + this.userPath + 'get-activities', body, refreshToken);
  }

  loginToken(refreshToken: string): Promise<User> {
    return this.doGet<User>(this.serverUrl + 'login-token', NULL_TOKEN, DataService.refreshHeader(refreshToken));
  }

  accessToken(refreshToken: string): Promise<{ access_token: string }> {
    return this.doGet<{ access_token: string }>(this.serverUrl + 'access-token', NULL_TOKEN, DataService.refreshHeader(refreshToken));
  }

  geolocation(address: string): Promise<any> {
    return this.doGet<any>(`https://eu1.locationiq.com/v1/search.php?key=pk.c7c99c10cf697dedb99068474806aab4&q=${encodeURI(address)}&format=json`, NULL_TOKEN);
  }

  getNearActivities(position: Geolocation, accessToken: string): Promise<Activity[]> {
    return this.doGet<Activity[]>(this.serverUrl + this.userPath + 'get-near-activities', accessToken,
      new HttpParams().append('longitude', position.longitude.toString()).append('latitude', position.latitude.toString()));
  }

  removeActivity(body: object, refreshToken: string): Promise<string> {
    return this.doPost<string>(this.serverUrl + 'user/delete-activity', body, refreshToken);
  }
}
