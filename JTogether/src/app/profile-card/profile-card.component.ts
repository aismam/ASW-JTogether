import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() imageUrl: string | undefined;
  @Input() name = undefined;
  @Input() creator: string | undefined;
  @Input() place = undefined;
  @Input() dateTime = undefined;
  @Input() description = undefined;


  constructor() { }

  ngOnInit(): void {
  }

}
