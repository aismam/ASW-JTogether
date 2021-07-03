import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username: string | undefined;
  profilePicLink: string | undefined;
  constructor() { }
}
