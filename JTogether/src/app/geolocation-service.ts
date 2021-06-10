import {Injectable} from '@angular/core';
import {getDistance} from 'geolib';
import {GeolibDistanceFn, GeolibInputCoordinates} from 'geolib/es/types';
import {DataService} from './data.service';

const FIRST_RESULT = 0;
const LOCALIZATION_ERROR = 'Localizzazone non attiva';
const ACCURACY_METER = 1;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService{

  constructor(private dataService: DataService) {
  }

  public getLocation(): Promise<GeolibInputCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation){
        reject(new Error(LOCALIZATION_ERROR));
      }
      navigator.geolocation.getCurrentPosition(
        p => resolve(this.toGeoCoordinates(p.coords.latitude, p.coords.longitude)),
          e => reject(e));
    });
  }

  public toGeoCoordinates(latitude: number, longitude: number): GeolibInputCoordinates{
    return {latitude, longitude};
  }
  public getDistance(from: GeolibInputCoordinates, to: GeolibInputCoordinates): number{
    return getDistance(from, to, ACCURACY_METER);
  }
  public getGeoCoordinates(address: string): Promise<GeolibInputCoordinates | null>{
    return this.dataService.geolocation(address)
      .then(j => this.toGeoCoordinates(j[FIRST_RESULT].lat, j[FIRST_RESULT].lon));
  }
}
