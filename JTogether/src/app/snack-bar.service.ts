import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

const CLOSE_MESSAGE = 'Chiudi';
const SNACK_DURATION = 2000000;

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public errorSnack(message: string, buttonMessage: string = CLOSE_MESSAGE): void{
    this.snackBar.open(message, buttonMessage, {panelClass: 'snackbar-error', duration : SNACK_DURATION});
  }
  public normalSnack(message: string, buttonMessage: string = CLOSE_MESSAGE): void{
    this.snackBar.open(message, buttonMessage,{duration : SNACK_DURATION});
  }
}
