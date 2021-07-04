import {Injectable} from '@angular/core';
import {getDistance} from 'geolib';
import {Geolocation} from './_Models/Geolocation';

const LOCALIZATION_ERROR = 'Localizzazione non attiva';
const ACCURACY_METER = 1;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService{

  public getGeolocation(): Promise<Geolocation> {
    return this.tryGetGeolocation();
  }

  public toGeoCoordinates(latitude: number, longitude: number): Geolocation{
    return {latitude, longitude};
  }
  public getDistance(from: Geolocation, to: Geolocation): number{
    return getDistance(from, to, ACCURACY_METER);
  }

  private tryGetGeolocation(): Promise<Geolocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation){
        return reject(LOCALIZATION_ERROR);
      }
      navigator.geolocation.getCurrentPosition(
        p => resolve(this.toGeoCoordinates(p.coords.latitude, p.coords.longitude)),
        _ => reject(LOCALIZATION_ERROR));
    });
  }
}
