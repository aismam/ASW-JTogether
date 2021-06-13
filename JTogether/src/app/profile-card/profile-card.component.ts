import {Component, Input, OnInit} from '@angular/core';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {DataService} from '../data.service';
import {LocalStorageService} from '../local-storage.service';

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

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.dataService.removeActivity(
      { activity_id: this.id},
      this.localStorage.getAccessToken() as string)
      .then( () => {
        this.snackBar.normalSnack('L\'attività è stata eliminata!');
        // TODO metti qui il metodo per autodistruggerti
      })
      .catch( e => this.snackBar.errorSnack(e.message));
  }

  modifyActivity(): void {
    this.route.goModifyActivity();
  }

}
