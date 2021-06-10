import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {DataService} from './data.service';
import {JwtHelperService} from '@auth0/angular-jwt';

const DELTA_EXPIRATION_TIME_MILLIS = 2000;
const DELTA_EXPIRATION_TIME_SECONDS = DELTA_EXPIRATION_TIME_MILLIS / 1000;
@Injectable({
  providedIn: 'root'
})
export class AccessTokenUpdaterService{
  private isUpdating = false;
  constructor(private localStorage: LocalStorageService,
              private dataService: DataService) {}

  public startUpdating(errorCallback: (_: any) => void): void{
    this.isUpdating = true;
    this.update(errorCallback);
  }

  public stopUpdating(): void {
    this.isUpdating = false;
  }

  private update(errorCallback: (_: any) => void): void{
    const jwt = new JwtHelperService();
    const refreshToken = this.localStorage.getRefreshToken();
    if (refreshToken){
      const accessToken = this.localStorage.getAccessToken();
      if (accessToken && !jwt.isTokenExpired(accessToken, DELTA_EXPIRATION_TIME_SECONDS)){
        setTimeout(() => this.update(errorCallback), jwt.getTokenExpirationDate(accessToken)?.getTime() as number);
      }else if (this.isUpdating){
        this.dataService.accessToken(this.localStorage.getRefreshToken() as string)
          .then(t => {
              const updateTime = new JwtHelperService().getTokenExpirationDate(t.access_token)?.getTime() as number
                - Date.now()
                - DELTA_EXPIRATION_TIME_MILLIS;
              this.localStorage.setAccessToken(t.access_token);
              setTimeout(() => this.update(errorCallback), updateTime);
          })
          .catch(e => errorCallback(e));
      }
    }
    else{
      errorCallback(new Error('refresh token non presente'));
    }
  }



}
