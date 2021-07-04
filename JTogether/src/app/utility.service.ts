import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  removeTime(str: string): string{
    str = str.substring(0, str.length - 8);
    const s = str.split('T');
    return s[0] + ', ' + s[1];
  }
}
