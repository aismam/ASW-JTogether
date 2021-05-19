import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-participated-activity-card',
  templateUrl: './participated-activity-card.component.html',
  styleUrls: ['./participated-activity-card.component.scss']
})
export class ParticipatedActivityCardComponent implements OnInit {

  @Input() imageUrl: string | undefined;
  ev = 'Biciclettata contro Brando';
  constructor() { }

  ngOnInit(): void {
  }

}
