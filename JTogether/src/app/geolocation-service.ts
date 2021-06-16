import {Injectable} from '@angular/core';
import {getDistance} from 'geolib';
import {DataService} from './data.service';
import {Geolocation} from './_Models/Geolocation';

const FIRST_RESULT = 0;
const LOCALIZATION_ERROR = 'Localizzazone non attiva';
const ACCURACY_METER = 1;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService{
  private geolocation: Geolocation | undefined;

  constructor(private dataService: DataService) {
  }

  public getGeolocation(): Promise<Geolocation> {
    return this.tryGetGeolocation().then(g => this.geolocation = g);
  }

  public toGeoCoordinates(latitude: number, longitude: number): Geolocation{
    return {latitude, longitude};
  }
  public getDistance(from: Geolocation, to: Geolocation): number{
    return getDistance(from, to, ACCURACY_METER);
  }

  private tryGetGeolocation(): Promise<Geolocation> {
    if (this.geolocation){
      return Promise.resolve(this.geolocation);
    }
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation){
        return reject(new Error(LOCALIZATION_ERROR));
      }
      navigator.geolocation.getCurrentPosition(
        p => resolve(this.toGeoCoordinates(p.coords.latitude, p.coords.longitude)),
        e => reject(e));
    });
  }
}
