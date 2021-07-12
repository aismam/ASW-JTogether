import {Component, Input, OnInit} from '@angular/core';
import {JRouter} from '../jrouter.service';
import {SnackBarService} from '../snack-bar.service';
import {DataService} from '../data.service';
import {UtilityService} from '../utility.service';
import {TokensManagerService} from '../tokens-manager.service';

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
  isVisible = true;

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private tokenManagerService: TokensManagerService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    this.dateTime = this.utilityService.formatDateTime(this.dateTime as string);
  }

  delete(): void {
    this.tokenManagerService.getAccessToken()
      .then(t => this.dataService.removeActivity({ activity_id: this.id}, t))
      .then(_ => {
        this.snackBar.normalSnack('L\'attività è stata eliminata!');
        this.isVisible = false;
      })
      .catch( e => this.snackBar.errorSnack(e.message));
  }

  modifyActivity(): void {
    this.route.goModifyActivity(this.id as string);
  }

  goToChat(): void {
    this.route.activityChat(this.id as string);
  }
}
