import {Injectable} from '@angular/core';

const REFRESH_TOKEN = 'refresh_token';
const PROFILE_PIC = 'profilePic';
const USERNAME = 'username';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public getRefreshToken(): string | null{
    return window.localStorage.getItem(REFRESH_TOKEN);
  }

  public setRefreshToken(refreshToken: string): void {
    window.localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  public unsetRefreshToken(): void {
    return window.localStorage.removeItem(REFRESH_TOKEN);
  }

  public setActivityID(id: string): void {
    window.localStorage.setItem('activityID', id);
  }

  public getActivityID(): string | null {
    return window.localStorage.getItem('activityID');
  }

  public unsetActivityID(): void {
    return window.localStorage.removeItem('activityID');
  }

  public setPicProfile(link: string): void {
    return window.localStorage.setItem(PROFILE_PIC, link);
  }

  public getPicProfile(): string | null {
    return window.localStorage.getItem(PROFILE_PIC);
  }

  public setUsername(username: string): void{
    return window.localStorage.setItem(USERNAME, username);
  }

  public getUsername(): string | null{
    return window.localStorage.getItem(USERNAME);
  }
}
