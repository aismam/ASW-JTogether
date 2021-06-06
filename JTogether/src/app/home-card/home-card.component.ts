import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent {

  @Input() imageUrl: string | undefined;
  @Input() name = undefined;
  @Input() creator: string | undefined;
  @Input() place = undefined;
  @Input() dateTime = undefined;
  @Input() description = undefined;

  constructor(
    private route: Router,
    private snackBar: MatSnackBar,
    private dataService: DataService,
  ) { }

  random($event: MouseEvent): void{
    $event.preventDefault();
    /*this.dataService.logToken(
      localStorage.getItem('refresh_Token'),
      { refresh_token : localStorage.getItem('refresh_Token')},
      c => {
        this.snackBar.open('Successo!', 'Chiudi');
        console.log(c.activity_created);
      },
      e => {
        this.snackBar.open(e.error.message, 'Chiudi');
        console.log('not ok');
      }
    );*/
  }

}
