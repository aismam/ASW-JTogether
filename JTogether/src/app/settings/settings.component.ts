import { Component, OnInit } from '@angular/core';
import {TokensManagerService} from '../tokens-manager.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private tokenManager: TokensManagerService,
  ) { }

  ngOnInit(): void {
    this.tokenManager.isLoggedIn(() => {});
  }

}
