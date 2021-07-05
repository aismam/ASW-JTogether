import {Message} from './Message';
import {Geolocation} from './Geolocation';

export interface Activity {
  profile_pic: string;
  id: string;
  participants: string[];
  name: string;
  creator_username: string;
  location: string;
  date_time: string;
  description: string;
  geolocation: Geolocation;
  chat: Message[];
}
