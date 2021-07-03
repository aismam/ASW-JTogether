import {Notification} from './Notification';

export interface User{
  profilePic: string;
  created_activities: string[];
  participated_activities: string[];
  username: string;
  email: string;
  access_token: string;
  refresh_token: string;
  notifications: Notification[];
}
