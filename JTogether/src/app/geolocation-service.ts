import {Injectable} from '@angular/core';
import {getDistance} from 'geolib';
import {GeolibDistanceFn, GeolibInputCoordinates} from 'geolib/es/types';
import {DataService} from './data.service';
import {Geolocation} from './_Models/Geolocation';

const FIRST_RESULT = 0;
const LOCALIZATION_ERROR = 'Localizzazone non attiva';
const ACCURACY_METER = 1;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService{

  constructor(private dataService: DataService) {
  }

  public getLocation(): Promise<Geolocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation){
        reject(new Error(LOCALIZATION_ERROR));
      }
      navigator.geolocation.getCurrentPosition(
        p => resolve(this.toGeoCoordinates(p.coords.latitude, p.coords.longitude)),
          e => reject(e));
    });
  }

  public toGeoCoordinates(latitude: number, longitude: number): Geolocation{
    return {latitude, longitude};
  }
  public getDistance(from: Geolocation, to: Geolocation): number{
    return getDistance(from, to, ACCURACY_METER);
  }
  public getGeoCoordinates(address: string): Promise<Geolocation>{
    return this.dataService.geolocation(address)
      .then(j => this.toGeoCoordinates(j[FIRST_RESULT].lat, j[FIRST_RESULT].lon));
  }
}