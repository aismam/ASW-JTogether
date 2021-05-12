import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  @Input() title: string | undefined;

  constructor(private router: Router) {}

  onItemClick(): void {
    this.router.url === '/home' ?
      this.router.navigate(['/settings']) :
      this.router.navigate(['/home']);
  }



}
