import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-participated-activity',
  templateUrl: './participated-activity.component.html',
  styleUrls: ['./participated-activity.component.scss']
})
export class ParticipatedActivityComponent implements OnInit {

  cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor() { }

  ngOnInit(): void {
  }

}
