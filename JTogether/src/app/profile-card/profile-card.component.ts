import {Component, Input, OnInit} from '@angular/core';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {DataService} from '../data.service';
import {LocalStorageService} from '../local-storage.service';
import {UtilityService} from '../utility.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() imageUrl: string | undefined;
  @Input() name: string | undefined;
  @Input() creator: string | undefined;
  @Input() place: string | undefined;
  @Input() dateTime: string | undefined;
  @Input() description: string | undefined;
  @Input() id: string | undefined;
  cardSide = false;

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    this.dateTime = this.utilityService.removeTime(this.dateTime as string);
  }

  delete(): void {
    // TODO potresti fare un dialog
    this.dataService.removeActivity(
      { activity_id: this.id},
      this.localStorage.getRefreshToken() as string)
      .then( () => {
        this.snackBar.normalSnack('L\'attività è stata eliminata!');
        window.location.reload(); // Aggiorna la pagina, cosi vedi il cambiamento
      })
      .catch( e => this.snackBar.errorSnack(e.message));
  }

  modifyActivity(): void {
    this.route.goModifyActivity(this.id as string);
  }

  flipCard(): void {
    // this.cardSide = !this.cardSide; //TODO decommenta a fine prove
  }
}
