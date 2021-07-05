import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import {TokensManagerService} from '../tokens-manager.service';
import {SnackBarService} from '../snack-bar.service';
import {ProfileImageService} from '../profile-image.service';
import {UtilityService} from '../utility.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit{
  @Input() imageUrl: string | undefined;
  @Input() name: string | undefined;
  @Input() creator: string | undefined;
  @Input() place: string | undefined;
  @Input() dateTime: string | undefined;
  @Input() description: string | undefined;
  @Input() activityId: string | undefined;
  isHidden = false;

  constructor(
    private route: Router,
    private snackBar: SnackBarService,
    private dataService: DataService,
    private tokenService: TokensManagerService,
    private profileImage: ProfileImageService,
    private utilityService: UtilityService,
  ) { }

  participate(): void{
    this.tokenService.getAccessToken()
      .then(t => this.dataService.createParticipation({activity_id: this.activityId}, t))
      .then(_ => this.snackBar.normalSnack('Adesso partecipi a ' + this.name + '!'))
      .then(_ => this.isHidden = true)
      .catch(e => this.snackBar.errorSnack(e.message));
  }

  ngOnInit(): void {
    this.dateTime = this.utilityService.formatDateTime(this.dateTime as string);
  }
}
