import {Component, Input} from '@angular/core';
import { MaterialModule} from '../material/material.module';

@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./edit-text.component.scss']
})
export class EditTextComponent {
  @Input() placeholder: string | undefined;
  @Input() icon: string | undefined;
  @Input() hint: string | undefined;
}
