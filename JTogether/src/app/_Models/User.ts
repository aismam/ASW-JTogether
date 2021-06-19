import {UserActivity} from './UserActivity';

export interface User{
  created_activities: UserActivity[];
  participated_activities: UserActivity[];
  username: string;
  email: string;
  access_token: string;
  refresh_token: string;
  notifications: string[];
}
