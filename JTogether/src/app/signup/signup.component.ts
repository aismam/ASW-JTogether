import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {SnackBarService} from '../snack-bar.service';
import {JRouter} from '../jrouter.service';

const SUCCESSFUL_REGISTRATION = 'Registrazione avvenuta con successo!';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  panelOpenState = false; // toglimi :D
  imageList = ['https://image.flaticon.com/icons/png/512/1018/1018961.png',
    'https://image.flaticon.com/icons/png/512/1018/1018973.png',
    'https://image.flaticon.com/icons/png/512/1176/1176205.png',
    'https://image.flaticon.com/icons/png/512/1176/1176206.png',
    'https://image.flaticon.com/icons/png/512/1176/1176207.png',
    'https://image.flaticon.com/icons/png/512/1176/1176208.png',
    'https://image.flaticon.com/icons/png/512/1018/1018979.png',
    'https://image.flaticon.com/icons/png/512/1018/1018980.png',
    'https://image.flaticon.com/icons/png/512/1019/1019128.png',
  ];

  lis = [[ 'https://image.flaticon.com/icons/png/512/1018/1018961.png', 'Barba e Casco'],
  ['https://image.flaticon.com/icons/png/512/1018/1018973.png', 'Barba e Capelli Lunghi'],
    ['https://image.flaticon.com/icons/png/512/1176/1176205.png', 'Scienziato'],
    ['https://image.flaticon.com/icons/png/512/1176/1176206.png', 'Scienziata'],
    ['https://image.flaticon.com/icons/png/512/1176/1176207.png', 'Dark ma meno giallo'],
    ['https://image.flaticon.com/icons/png/512/1176/1176208.png', 'Dark ma bianco'],
    ['https://image.flaticon.com/icons/png/512/1018/1018979.png', 'Capelli rossi'],
    ['https://image.flaticon.com/icons/png/512/1018/1018980.png', 'Capelli castani lunghi'],
    ['https://image.flaticon.com/icons/png/512/1019/1019128.png', 'Edgy girl'],
  ];

  username = 'ismo';
  email = 'sas@gmail.com';
  password = 'Sasso.1997';
  profilePic: string | undefined;
  hide = true;

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
  ) { }

  ngOnInit(): void {
  }

  goLogin($event: MouseEvent): void {
    $event.preventDefault();
    this.route.goLogin();
  }

  signup($event: MouseEvent): void {
    if (this.profilePic === undefined){
      this.profilePic = this.getRandomImageS()[0]; // TODO
    }
    this.dataService.signup({
      username : this.username,
      email : this.email,
      password : this.password,
      profilePic : this.profilePic})
      .then(_ => {
        this.snackBar.normalSnack(SUCCESSFUL_REGISTRATION);
        this.route.goLogin();
      })
      .catch(e => this.snackBar.errorSnack(e.error.message)); // TODO do something else
    console.log(this.profilePic);
  }

  selectImage(profPic: string): void{
    this.profilePic = profPic;
  }

  private getRandomImage(): string {
    return this.imageList[Math.floor(Math.random() * (this.imageList.length - 1))];
  }

  private getRandomImageS(): string[]{
    return this.lis[Math.floor(Math.random() * (this.lis.length - 1))];
  }

}
