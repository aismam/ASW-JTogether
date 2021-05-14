import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  private menuIcon = 'menu';
  private closeIcon = 'close';

  @Input() title: string | undefined;

  icon = this.menuIcon;

  constructor(private router: Router) {
    this.icon = router.getCurrentNavigation()?.extractedUrl.toString() === '/home' ? this.menuIcon : this.closeIcon;
  }

  onItemClick(): void {
    this.router.url === '/home' ?
      this.router.navigate(['/settings']) :
      this.router.navigate(['/home']);
  }



}
