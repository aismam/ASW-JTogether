import {Injectable} from '@angular/core';

const REFRESH_TOKEN = 'refresh_token';

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
}
