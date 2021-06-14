import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {DataService} from './data.service';
import {JwtHelperService} from '@auth0/angular-jwt';

const DELTA_EXPIRATION_TIME_MILLIS = 2000;
const DELTA_EXPIRATION_TIME_SECONDS = DELTA_EXPIRATION_TIME_MILLIS / 1000;

@Injectable({
  providedIn: 'root'
})
export class TokensManagerService {
  private accessToken: string | undefined;

  constructor(private localStorage: LocalStorageService,
              private dataService: DataService) {}

  public getRefreshToken(): string | null {
    return this.localStorage.getRefreshToken();
  }

  public setRefreshToken(token: string): void {
    this.localStorage.setRefreshToken(token);
  }

  public unsetRefreshToken(): void {
    this.localStorage.unsetRefreshToken();
  }

  public async getAccessToken(): Promise<string> {
    const jwt = new JwtHelperService();
    const refreshToken = this.localStorage.getRefreshToken();

    if (!refreshToken) {
      return Promise.reject({message: 'refresh token non presente'});
    }

    if (jwt.isTokenExpired(refreshToken, DELTA_EXPIRATION_TIME_SECONDS)){
      return Promise.reject({message: 'refresh token scaduto'});
    }

    if (this.accessToken && !jwt.isTokenExpired(this.accessToken, DELTA_EXPIRATION_TIME_SECONDS)){
      return Promise.resolve(this.accessToken);
    }
    return this.dataService.accessToken(refreshToken)
      .then(t => this.accessToken = t.access_token);
  }
}
