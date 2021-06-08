import {Injectable} from '@angular/core';

const REFRESH_TOKEN = 'refresh_token';
const ACCESS_TOKEN = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public getRefreshToken(): string | null{
    return localStorage.getItem(REFRESH_TOKEN);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  public setRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  public setAccessToken(accessToken: string): void {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  public removeRefreshToken(): void {
    return localStorage.removeItem(REFRESH_TOKEN);
  }

  public removeAccessToken(): void {
    return localStorage.removeItem(ACCESS_TOKEN);
  }
}
