import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './_Models/User';
import {Activity} from './_Models/Activity';
import {Geolocation} from './_Models/Geolocation';

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
  private doPost<X>(url: string, body?: object, token?: string): Promise<X> {
   return this.httpClient.post<X>(url, body,
        {headers : { Authorization : 'bearer ' + token}, responseType : 'json'})
        .toPromise();
  }

  private doGet<X>(url: string, token: string | null, params?: HttpParams): Promise<X> {
    const options = token ? {params, headers: {Authorization : 'bearer ' + token}} : {params};
    return this.httpClient.get<X>(url, options).toPromise();
  }

  login(user: object): Promise<User> {
    return this.doPost<User>(this.serverUrl + 'login/', user);
  }

  logout(refreshToken: object, accessToken: string): Promise<string> {
    return this.doPost<string>(this.serverUrl + 'logout/', refreshToken, accessToken);
  }

  signup(user: object): Promise<User>{
    return this.doPost<User>(this.serverUrl + 'signup/', user);
  }

  createActivity(activity: object, accessToken: string): Promise<Activity>{
    return this.doPost<Activity>(this.serverUrl + this.userPath + 'create-activity', activity, accessToken);
  }

  getActivities(body: object, accessToken: string ): Promise<Activity[]>{
    return this.doPost<Activity[]>(this.serverUrl + this.userPath + 'get-activities', body, accessToken);
  }

  loginToken(refreshToken: string): Promise<User> {
    return this.doGet<User>(this.serverUrl + 'login-token', null, DataService.refreshHeader(refreshToken));
  }

  accessToken(refreshToken: string): Promise<{ access_token: string }> {
    return this.doGet<{ access_token: string }>(this.serverUrl + 'access-token', null, DataService.refreshHeader(refreshToken));
  }

  clearNotifications(accessToken: string): Promise<User> {
    return this.doPost<User>(this.serverUrl + this.userPath + 'clear-notifications', undefined, accessToken);
  }

  getNearActivities(position: Geolocation, accessToken: string): Promise<Activity[]> {
    return this.doGet<Activity[]>(
      this.serverUrl + this.userPath + 'get-near-activities',
          accessToken,
          new HttpParams()
            .append('longitude', position.longitude.toString())
            .append('latitude', position.latitude.toString()));
  }

  searchActivities(searchText: string, refreshToken: string): Promise<Activity[]> {
    return this.doGet<Activity[]>(this.serverUrl + this.userPath + 'search-activities',
      refreshToken,
      new HttpParams().append('text', searchText));
  }

  sendMessage(body: object, accessToken: string): Promise<string> {
    return this.doPost<string>(this.serverUrl + this.userPath + 'create-message', body, accessToken);
  }

  removeActivity(body: object, refreshToken: string): Promise<string> {
    return this.doPost<string>(this.serverUrl + this.userPath + 'delete-activity', body, refreshToken);
  }

  modifyActivity(body: object, accessToken: string): Promise<Activity>{
    return this.doPost<Activity>(this.serverUrl + this.userPath + 'modify-activity', body, accessToken);
  }

  createParticipation(body: object, accessToken: string): Promise<Activity>{
    return this.doPost<Activity>(this.serverUrl + this.userPath + '/create-participation', body, accessToken);
  }

  deleteParticipation(body: object, accessToken: string): Promise<Activity>{
    return this.doPost<Activity>(this.serverUrl + this.userPath + '/delete-participation', body, accessToken);
  }

  deleteProfile(body: object, refreshToken: string): Promise<string> {
    return this.doPost<string>(this.serverUrl + this.userPath + 'delete-user', body, refreshToken);
  }

  modifyProfile(body: object, refreshToken: string): Promise<User> {
    return this.doPost<User>(this.serverUrl + this.userPath + 'update-user', body, refreshToken);
  }

  forgottenPassword(body: object): Promise<User> {
    return this.doPost<User>(this.serverUrl + this.userPath  + 'forgotten-password', body);
  }
}
