import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';

const materialComponents = [
  MatBadgeModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatDividerModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatSelectModule,
  MatGridListModule,
];

@NgModule({
  exports: [materialComponents],
  imports: [materialComponents]
})
export class MaterialModule { }
