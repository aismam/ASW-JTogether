import { Component, OnInit } from '@angular/core';
import {Activity} from '../_Models/activity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  activities: Activity = {
    imageUrl : 'http://www-db.deis.unibo.it/courses/TW/DOCS/w3schools/w3css/img_avatar3.png',
    id : '123',
    name: 'Biciclettata contro Dio Brando',
    creator : 'Jotaro Kujo',
    departurePlace : 'Morio Cho',
    arrivalPlace : 'Venezia',
    day : '15/05/2021',
    time : '12:15',
    description : 'Jotaro.. non preoccuparti più per me.. io ho fatto \n' +
      'la mia parte.. Kakyoin ha scoperto il segreto dello \n' +
      'Stand di Dio.. io sono riuscito a comunicartelo.. \n' +
      'se lo avessimo combattuto insieme probabilmente \n' +
      'saremmo stati sconfitti subito.. ora sei in grado di \n' +
      'muoverti qualche secondo anche quando \n' +
      'il tempo si ferma.',
    participants : 5
  };
  utente = 'Jotaro Kujo';
  email = 'jotaro.kujo@speedwagon.org';

  createdActivities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() { }

  ngOnInit(): void {
  }

}
